import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  if (!!localStorage.getItem('authToken')) {
    authService.isLoggedIn$.next(true);
  }
  const isAuthenticated = authService.isLoggedIn$.value;

  return isAuthenticated
    ? isAuthenticated
    : inject(Router).navigate(['']);
};