import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

import { ShowDataRoutingModule } from './show-data-routing.module';
import { ShowDataPageComponent } from './show-data-page.component';
import { ShowDataComponent } from '../../components/show-data/show-data.component';
import { ShowTableComponent } from '../../components/show-table/show-table.component';

import { UsersComponent } from '../../components/users/users.component';
import { NewsComponent } from '../../components/news/news.component';
import { NewsFilterComponent } from '../../components/news-filter/news-filter.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';

import { ComponentDirective } from '../../services/component.directive';
import { FilterDirective } from '../../services/component.directive';
import { UserAgeDirective, UserAvatarDirective, UserDateDirective,
UserIdDirective, UserNameDirective} from '../../services/table-users.directive';


@NgModule({
  declarations:
    [
      ShowDataPageComponent,
      ShowDataComponent,
      UsersComponent,
      NewsComponent,
      ComponentDirective,
      FilterDirective,
      NewsFilterComponent,
      UsersFilterComponent,
      ShowTableComponent,
      UserIdDirective,
      UserNameDirective,
      UserDateDirective,
      UserAvatarDirective,
      UserAgeDirective
    ],
  imports: [
    CommonModule,
    ShowDataRoutingModule,
    SharedModule,
  ],
  entryComponents:
    [
      UsersComponent,
      NewsComponent,
      NewsFilterComponent,
      UsersFilterComponent
    ]
})
export class ShowDataModule { }
