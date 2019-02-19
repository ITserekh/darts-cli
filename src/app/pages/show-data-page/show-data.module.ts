import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

import { ShowDataRoutingModule } from './show-data-routing.module';
import { ShowDataPageComponent } from './show-data-page.component';
import { ShowDataComponent } from '../../components/show-data/show-data.component';
import { ShowTableComponent } from '../../components/show-table/show-table.component';

import { UsersComponent } from '../../components/users/users.component';
import { NewsComponent } from '../../components/news/news.component';
import { NewsFilterComponent } from '../../components/news-filter/news-filter.component';
// import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';

import { ComponentDirective } from '../../services/component.directive';
import { FilterDirective } from '../../services/component.directive';
import { DirectivesModule } from '../../derectives/directives.module';
import { TableCellComponent } from '../../components/table-cell/table-cell.component';
import { TableBodyComponent } from '../../components/table-body/table-body.component';


import { ReactiveFormsModule } from '@angular/forms';
import {PagingComponent} from '../../components/paging/paging.component';




@NgModule({
  declarations: [
      ShowDataPageComponent,
      ShowDataComponent,
      UsersComponent,
      NewsComponent,
      ComponentDirective,
      FilterDirective,
      NewsFilterComponent,
      // UsersFilterComponent,
      ShowTableComponent,
      TableCellComponent,
      TableBodyComponent,
    PagingComponent
  ],
  imports: [
    CommonModule,
    ShowDataRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  entryComponents:
    [
      // UsersComponent,
      // NewsComponent,
      // NewsFilterComponent,
      // UsersFilterComponent
    ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ShowDataModule { }
