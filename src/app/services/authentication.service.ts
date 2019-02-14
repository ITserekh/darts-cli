import { Injectable } from '@angular/core';
import {UserData} from './interfaces/users-date';

const users: UserData[] = [
  {userName: 'admin', password: 'admin', role: 'admin'},
  {userName: 'user', password: 'user', role: 'user'}
]

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: UserData;

  constructor() { }

  login(name: string, pass: string): boolean {
    console.log('name: ', name, ' ', 'pass', pass);
    users.forEach(user => {
      if (user.userName === name && user.password === pass) {
        this.currentUser = user;
        localStorage.setItem('currentUser', user.role);
      }
    });
    return this.currentUser ? true : false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  get currentUserValue(): string {
    console.log('localStorage: ', localStorage.getItem('currentUser'));
    console.log(localStorage.getItem('currentUser'));
    return localStorage.getItem('currentUser');
  }
}
