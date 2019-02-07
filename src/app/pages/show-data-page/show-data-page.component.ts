import { Component, OnInit } from '@angular/core';
// import { settingUsersTable } from '../../services/table-configs/setting-users-table';
import { TableSetting } from '../../services/table-configs/setting-table';
import { Users2 } from '../../services/users';
import {Observable} from 'rxjs';
import {GetDataService} from '../../services/get-data.service';
import {USER2_URL, USER_TABLE_SETTINGS} from '../../services/urls';

@Component({
  selector: 'app-show-data-page',
  templateUrl: './show-data-page.component.html',
  styleUrls: ['./show-data-page.component.scss']
})
export class ShowDataPageComponent implements OnInit {

  settingTable: Observable<TableSetting>;

  usersAsync: Observable<Users2[]>;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.usersAsync = this.getDataService.getJSON(USER2_URL);
    this.settingTable = this.getDataService.getJSON(USER_TABLE_SETTINGS);
  }
}
