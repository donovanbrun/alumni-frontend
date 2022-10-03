import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            req = this.addTokenHeader(req, access_token);
        }

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && !req.url.includes('api/token/') && error.status === 401) {
                return this.handle401Error(req, next);
            }
            return throwError(() => error);
          }));
    }

    private addTokenHeader(req: HttpRequest<any>, token: string) {
        return req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refresh().pipe(
            switchMap((response: any) => {
                this.authService.setSession(response);
                return next.handle(this.addTokenHeader(req, response.access));
            })
        );
    }
}
