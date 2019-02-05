import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatDialogModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PlayersService } from './services/players.service';
import { ThrowService } from './services/throw.service';
import { Game501Service } from './services/game501.service';
import { Game301Service } from './services/game301.service';
import { ChooseGameService } from './services/choose-game.service';
import { GetDataService } from './services/get-data.service'

import { AppRoutingModule } from './app-routing.module';

import { AddPlayerComponent } from './components/add-player/add-player.component';

import { ShowPointsComponent } from './components/show-points/show-points.component';
import { ShowWinnerComponent } from './components/show-winner/show-winner.component'

// import { ComponentDirective } from './services/component.directive';
import { ComponentService } from './services/component.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AddPlayerComponent,
    ShowPointsComponent,
    ShowWinnerComponent,
    // ComponentDirective
  ],
  providers: [
    PlayersService,
    Game501Service,
    Game301Service,
    ThrowService,
    ChooseGameService,
    GetDataService,
    ComponentService
  ],
  entryComponents: [
    AddPlayerComponent,
    ShowPointsComponent,
    ShowWinnerComponent,
    // NewsComponent,
    // UsersComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
