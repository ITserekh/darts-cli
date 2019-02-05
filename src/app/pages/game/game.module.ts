import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './game-page.component';

import { ThrowsComponent } from '../../components/throws/throws.component';
import { ThrowsListComponent } from '../../components/throws-list/throws-list.component';

import { SharedModule } from '../../shared.module';

@NgModule({
  declarations:
    [
      GamePageComponent,
      ThrowsComponent,
      ThrowsListComponent
    ],
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GameModule { }
