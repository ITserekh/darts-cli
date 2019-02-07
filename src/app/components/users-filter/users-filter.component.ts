import { Component, OnInit } from '@angular/core';
import { DataFilterComponent, UsersData } from '../../services/data-component';
import { GetDataService } from '../../services/get-data.service';
import { USER_URL } from '../../services/urls';
import { FilterUsersService } from '../../services/filter-users.service';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit, DataFilterComponent {

  data: UsersData;

  constructor(private getDataService: GetDataService,
              private filterUserService: FilterUsersService) { }

  ngOnInit() {
    this.data = {Id: 0, userInfo: ''};
  }

  filter() {
    this.filterUserService.filter(USER_URL, this.data);
  }
}
