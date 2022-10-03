import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../../components/login/login-dto";
import jwtDecode from "jwt-decode";
import { tap } from "rxjs";
import * as dayjs from "dayjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  public login(loginDto: LoginDto) {
    return this.http.post("http://localhost:8000/api/token/", loginDto).pipe(
      tap(response => this.setSession(response))
    );
  }

  public logout() {
    this.removeSession();
    this.router.navigate(["/login"]);
  }

  public refresh() {
    return this.http.post("http://localhost:8000/api/token/refresh/", {
      refresh: localStorage.getItem("refresh_token")
    });
  }

  public setSession(authResult: any) {
    localStorage.setItem("access_token", authResult.access);
    localStorage.setItem("refresh_token", authResult.refresh);
  }

  private removeSession() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  private isAccessTokenExpired(access_token: string) {
    const decodedJwt: any = jwtDecode(access_token);
    if(dayjs().isAfter(dayjs(decodedJwt.exp * 1000))) {
      return true;
    }
    return false;
  }

  public isAuthenticated(): boolean {
    const access_token = localStorage.getItem("access_token");
    if(access_token) {
      if(this.isAccessTokenExpired(access_token)) {
        this.refresh().subscribe({
          next: (response: any) => {
              this.setSession(response);
              return true;
          },
          error: () => {
            this.logout();
            return false;
          }
        })
      }
      return true;
    }
    return false;
  }
}
