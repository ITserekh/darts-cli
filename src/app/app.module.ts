import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PlayersService } from './services/players.service';
import { ThrowService } from './services/throw.service';
import { Game501Service } from './services/game501.service';
import { Game301Service } from './services/game301.service';
import { ChooseGameService } from './services/choose-game.service';
import { GetDataService } from './services/get-data.service';
import { FilterNewsService } from './services/filter-news.servise';
import { AppRoutingModule } from './app-routing.module';

import { ShowPointsComponent } from './components/show-points/show-points.component';
import { ShowWinnerComponent } from './components/show-winner/show-winner.component';

import { ComponentService } from './services/component.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    ShowPointsComponent,
    ShowWinnerComponent,
  ],
  providers: [
    PlayersService,
    Game501Service,
    Game301Service,
    ThrowService,
    ChooseGameService,
    GetDataService,
    ComponentService,
    FilterNewsService
  ],
  entryComponents: [
    ShowPointsComponent,
    ShowWinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
