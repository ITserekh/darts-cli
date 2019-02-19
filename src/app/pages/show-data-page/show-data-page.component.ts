import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TableSetting } from '../../services/table-configs/setting-table';
import { Users2 } from '../../services/users';
import {Observable, of, Subject} from 'rxjs';
import {GetDataService} from '../../services/get-data.service';
import {USER2_URL, USER_TABLE_SETTINGS, CARS_DATA_URL} from '../../services/urls';

@Component({
  selector: 'app-show-data-page',
  templateUrl: './show-data-page.component.html',
  styleUrls: ['./show-data-page.component.scss']
})
export class ShowDataPageComponent implements OnInit {

  currentPage: number = 1;

  settingTable: Observable<TableSetting>;

  // usersAsync: Observable<Users2[]>;
  users: Users2[];

  constructor(private getDataService: GetDataService,
              public cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDataService.getPage(this.currentPage).subscribe( res => {
      this.users = res;
    });
    this.settingTable = this.getDataService.getJSON(USER_TABLE_SETTINGS);
  }

  previuosPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDataService.getPage(this.currentPage).subscribe(res => {
        this.users = res;
      });
    }
  }

  nextPage() {
    this.currentPage++;
    this.getDataService.getPage(this.currentPage).subscribe( res => {
      this.users = res;
    });
  }
}
