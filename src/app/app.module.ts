import { NgModule } from '@angular/core';
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

import { SettingPageComponent }from './pages/setting/setting-page.component';
import { GamePageComponent  }   from './pages/game/game-page.component';

import { SelectPlayersComponent  } from './components/select-players/select-players.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { ChooseGameComponent } from './components/choose-game/choose-game.component';
import { LogoComponent } from './components/logo/logo.component';
import { ThrowsComponent } from './components/throws/throws.component';
import { ThrowsListComponent } from './components/throws-list/throws-list.component';
import { ShowPointsComponent } from './components/show-points/show-points.component';
import { ShowWinnerComponent } from './components/show-winner/show-winner.component'

import { ReversePipe } from './services/reverse.pipe';
import { ShowDataComponent } from './components/show-data/show-data.component';
import { NewsComponent } from './components/news/news.component';
import { UsersComponent } from './components/users/users.component';
import { ComponentDirective } from './services/component.directive';
import { ComponentService } from './services/component.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SettingPageComponent,
    GamePageComponent,
    SelectPlayersComponent,
    AddPlayerComponent,
    ChooseGameComponent,
    LogoComponent,
    ThrowsComponent,
    ThrowsListComponent,
    ReversePipe,
    ShowPointsComponent,
    ShowWinnerComponent,
    ShowDataComponent,
    NewsComponent,
    UsersComponent,
    ComponentDirective
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
    NewsComponent,
    UsersComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
