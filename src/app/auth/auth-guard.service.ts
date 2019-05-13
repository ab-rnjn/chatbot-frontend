import {Injectable} from '@angular/core';
// import {CanActivate, CanActivateChild} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {
  CanActivate, Router, NavigationEnd,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return !!localStorage.getItem('token');
  }

  canActivateChild() {
    return true;
  }
}
