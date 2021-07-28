//For binding the logged in bit.
//https://stackblitz.com/edit/angular-login-hide-navbar-ngif?file=src%2Fapp%2Fheader%2Fheader.component.html 

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {
    this.checkAuthStatus();
  }
  //We can either assign on login or we could constantly check the database
  checkAuthStatus() {
    if (localStorage.getItem('user')) {
      this.loggedIn.next(true);
    }
    else {
      this.loggedIn.next(false);
    }
  }

  //We can either assign on login or we could constantly check the database
  checkAuthRole(roleCode) {
    let vm: any = new Object();
    vm = JSON.parse(localStorage.getItem('user'));

    let isAuthenticated: boolean = false;

    //Roles
    if (vm != null && vm.RoleCodes != null) {
      vm.RoleCodes.forEach((element) => {
        if (roleCode == element) {
          isAuthenticated = true;
        }
      });
    }
    return isAuthenticated;
  }

  login(vm: any) {
    this.loggedIn.next(true);
    console.log(vm);
    localStorage.setItem('user', JSON.stringify(vm));
    this.router.navigate(['/home']);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.clear();
  }
}
