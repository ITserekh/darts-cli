import {Component, ContentChild, OnInit, TemplateRef, Input } from '@angular/core';
// import { USER2_URL} from '../../services/urls';
// import { GetDataService } from '../../services/get-data.service';
import { Users2 } from '../../services/users';
import { Observable } from 'rxjs';
/*
import { UserAgeDirective, UserAvatarDirective,
  UserDateDirective, UserNameDirective, UserIdDirective} from '../../services/table-users.directive';
  */
import {TableSetting} from '../../services/table-configs/setting-table';


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit {
  /*
  @ContentChild(UserIdDirective, {read: TemplateRef}) userIdTemplate;
  @ContentChild(UserNameDirective, {read: TemplateRef}) userNameTemplate;
  @ContentChild(UserAgeDirective, {read: TemplateRef}) userAgeTemplate;
  @ContentChild(UserDateDirective, {read: TemplateRef}) userDateTemplate;
  @ContentChild(UserAvatarDirective, {read: TemplateRef}) userAvatarTemplate;
  */

  @Input() tableSetting: Observable<TableSetting>;

  @Input() data: any[];

  constructor() {
  }

  ngOnInit() {
  }
}
