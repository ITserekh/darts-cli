import { Component, OnInit } from '@angular/core';
import {DataComponent, DataFilterComponent, UsersData} from '../../services/data-component';
import {GetDataService} from '../../services/get-data.service';
import {USER_URL} from '../../services/urls';
import {Users} from '../../services/users';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit, DataFilterComponent {

  data: UsersData;
  users: Users[];

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
  }
  filter(data: UsersData) {}
}
