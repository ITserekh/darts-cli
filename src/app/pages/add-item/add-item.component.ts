import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BankDataService } from '../../services/bank/bank-data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bankDataService: BankDataService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: [''],
      password: ['']
    });
  }

  connect() {
    const login = 'maa-bta2';
    const password = '1';

    // const login = this.form.controls.login.value;
    // const password = this.form.controls.password.value;

    this.bankDataService.login(login, password);
  }

  logout() {
    this.bankDataService.logout();
  }

  getUser() {
    this.bankDataService.getUserById().subscribe( user => {
      console.log(user);
    });
  }

}
