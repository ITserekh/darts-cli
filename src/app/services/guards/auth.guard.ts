import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.expectedRole && route.data.expectedRole.indexOf(currentUser) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/hello']);
    // this.router.navigate(['/hello'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  canLoad(route: Route): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser === 'admin') {
      return true;
    } else {
      this.router.navigate(['/hello']);
      return false;
    }
  }
}
