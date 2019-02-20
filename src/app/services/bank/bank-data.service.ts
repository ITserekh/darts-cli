import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FiltredValues} from '../users';

const LOGIN_URL = 'https://192.168.253.168:7702/ibservices/session/login';
const LOGIN_LOGOUT = 'https://192.168.253.168:7702/ibservices/session/login';
const GET_USER_URL = 'https://192.168.253.168:7702/ibservices/user/getUserById';
const GET_DOCUMENT_GRID_URL = 'https://192.168.253.168:8543/ibservices/document/getDocumentsGrid';

@Injectable({
  providedIn: 'root'
})
export class BankDataService {

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string) {
    const test = {
      "deviceUDID": "web", "applicID": "1", "clientKind": "5", "login": login, "password": password,
      "browser": "chrome", "browserVersion": "71.0.3578", "platform": "Windows 10", "clientTimeZone": 180
    };

    this.http.post<any>(LOGIN_URL, test).subscribe(item => {

      localStorage.setItem('session_token', item.sessionToken);
    });
    console.log('login');
  }

  logout() {
    const token = '51b70ee5-3bc2-4362-acbb-4f43aa537296';
    localStorage.setItem('session_token', token);
    console.log('logout');
  }

  getUserById() {
      let session_token = localStorage.getItem('session_token');

      if (session_token.length > 0) {

      const httpOptions = {
        headers: new HttpHeaders({session_token})
      }

      return this.http.post<any>(GET_USER_URL, {}, httpOptions);
    }
  }

  getDocumentsGrid(question) {
    let session_token = localStorage.getItem('session_token');
    const httpOptions = {
      headers: new HttpHeaders({session_token})
    };
    return this.http.post<any>(GET_DOCUMENT_GRID_URL, question, httpOptions);
  }
}
