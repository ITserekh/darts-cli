import {Component, ContentChild, OnInit, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TableSetting } from '../../services/table-configs/setting-table';


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit {

  @Input() tableSetting: Observable<TableSetting>;

  @Input() data: any[];

  constructor() {
  }

  ngOnInit() {
  }

  filter(columnName: string) {
    return true;
  }
}
