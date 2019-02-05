import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

import { ShowDataRoutingModule } from './show-data-routing.module';
import { ShowDataPageComponent } from './show-data-page.component';
import { ShowDataComponent } from '../../components/show-data/show-data.component';

import { UsersComponent } from '../../components/users/users.component';
import { NewsComponent } from '../../components/news/news.component';

import { ComponentDirective } from '../../services/component.directive';

@NgModule({
  declarations:
    [
      ShowDataPageComponent,
      ShowDataComponent,
      UsersComponent,
      NewsComponent,
      ComponentDirective
    ],
  imports: [
    CommonModule,
    ShowDataRoutingModule,
    SharedModule,
  ],
  entryComponents:
    [
      UsersComponent,
      NewsComponent
    ]
  // schemas: [NO_ERRORS_SCHEMA]
})
export class ShowDataModule { }
