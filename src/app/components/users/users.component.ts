import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../services/users';

import { FilterUsersService } from '../../services/filter-users.service';

import {DataComponent, UsersData} from '../../services/data-component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, DataComponent<UsersData> {

  data: UsersData;

  users: Users[];

  constructor(private filterUsersService: FilterUsersService) {
    filterUsersService.trigger.subscribe(res => {
      this.users = res;
    });
  }

  ngOnInit() {
  }
}
