import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../services/users';

import {DataComponent, UsersData} from '../../services/data-component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, DataComponent<UsersData> {

  data: UsersData;

  users: Users[];

  constructor() { }

  ngOnInit() {
  }
}
