import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // If the user is connected and he tries to go to the login page
        if (this.authService.isAuthenticated() && route.routeConfig?.path === "login") {
            this.router.navigate([""]);
            return false;
        }
        // If the user is not connected
        else if (!this.authService.isAuthenticated() && route.routeConfig?.path !== "login") {
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}