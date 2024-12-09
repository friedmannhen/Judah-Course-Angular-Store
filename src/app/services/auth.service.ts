import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false); //public for auth.guard use

  login(email: string, password: string) {
    //add Check in DB if user exists
    this.isLoggedIn$.next(true);
    localStorage.setItem('authToken', 'sample-token');
  }
  logout() {
    this.isLoggedIn$.next(false);
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }

  isAuthenticated$() {
    if (!!localStorage.getItem('authToken')) {
      this.isLoggedIn$.next(true);
    }
    return this.isLoggedIn$.asObservable();
  }
}
