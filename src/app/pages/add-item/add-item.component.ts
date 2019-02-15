import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const LOGIN_URL = 'https://192.168.253.168:7702/ibservices/session/login';
const GET_USER_URL = 'https://192.168.253.168:7702/ibservices/user/getUserById';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: [''],
      password: ['']
    });
  }

  connect() {
    // const login = this.form.controls.login;
    // const password = this.form.controls.password;
    const login = 'maa-bta2';
    const password = '1';
    const test = {"deviceUDID":"web","applicID":"1","clientKind":"5","login":"maa-bta2","password":"1",
      "browser":"chrome", "browserVersion":"71.0.3578","platform":"Windows 10","clientTimeZone":180};
    // const test = {login, password};
    const req = JSON.stringify(test);
    this.http.post<any>(LOGIN_URL, test).subscribe(item => {
      const session_token = item.sessionToken;

      const httpOptions = {
        headers: new HttpHeaders({session_token})
      }

      this.http.post<any>(GET_USER_URL, {}, httpOptions).subscribe(usersId => {
        console.log(usersId);
      });
    });
  }

}
