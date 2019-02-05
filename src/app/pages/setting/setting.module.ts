import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingPageComponent } from './setting-page.component';

import { SelectPlayersComponent } from '../../components/select-players/select-players.component';
import { ChooseGameComponent } from '../../components/choose-game/choose-game.component';

import { SharedModule } from '../../shared.module';
import { AddPlayerModule } from '../../components/add-player/add-player.module';

@NgModule({
  declarations:
    [
      SettingPageComponent,
      SelectPlayersComponent,
      ChooseGameComponent
    ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    SharedModule,
    AddPlayerModule,
    MatDialogModule
  ]
})
export class SettingModule { }
