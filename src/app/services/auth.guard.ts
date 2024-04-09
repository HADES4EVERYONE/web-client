import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { NetworkService } from "./network.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(NetworkService);


    return authService.getLoginStatus() ? true : inject(Router).createUrlTree(['auth']);
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => authGuard(route, state);