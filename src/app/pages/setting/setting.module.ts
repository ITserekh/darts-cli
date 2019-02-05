import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingPageComponent } from './setting-page.component';

import { SelectPlayersComponent } from '../../components/select-players/select-players.component';
import { ChooseGameComponent } from '../../components/choose-game/choose-game.component';

import { SharedModule } from '../../shared.module';

@NgModule({
  declarations:
    [
      SettingPageComponent,
      SelectPlayersComponent,
      ChooseGameComponent,
    ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SettingModule { }
