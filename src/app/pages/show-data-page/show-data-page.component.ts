import { Component, OnInit } from '@angular/core';
import { TableSetting } from '../../services/table-configs/setting-table';
import { Users2 } from '../../services/users';
import {Observable} from 'rxjs';
import {GetDataService} from '../../services/get-data.service';
import {USER2_URL, USER_TABLE_SETTINGS, CARS_DATA_URL} from '../../services/urls';

@Component({
  selector: 'app-show-data-page',
  templateUrl: './show-data-page.component.html',
  styleUrls: ['./show-data-page.component.scss']
})
export class ShowDataPageComponent implements OnInit {

  settingTable: Observable<TableSetting>;

  usersAsync: Observable<Users2[]>

  cars: Observable<any>;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.usersAsync = this.getDataService.getJSON(USER2_URL);
    this.settingTable = this.getDataService.getJSON(USER_TABLE_SETTINGS);
    this.cars = this.getDataService.getJSON(CARS_DATA_URL);

  }
}
