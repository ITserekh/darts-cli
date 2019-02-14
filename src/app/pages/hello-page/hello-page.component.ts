import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-hello-pages',
  templateUrl: './hello-page.component.html',
  styleUrls: ['./hello-page.component.scss']
})
export class HelloPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {
    const user = this.authenticationService.currentUserValue;
    console.log(user);
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const isUser = this.authenticationService.login(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
    );

    if (isUser) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authenticationService.logout();
    const user = this.authenticationService.currentUserValue;
    console.log(user);
  }
}
