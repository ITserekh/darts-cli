import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { PlayersService } from './services/players.service';
import { ThrowService } from './services/throw.service';
import { Game501Service } from './services/game501.service';
import { Game301Service } from './services/game301.service';
import { ChooseGameService } from './services/choose-game.service';
import { GetDataService } from './services/get-data.service';
import { FilterNewsService } from './services/filter-news.servise';
import { FilterUsersService } from './services/filter-users.service';
import { AppRoutingModule } from './app-routing.module';

import { ShowPointsComponent } from './components/show-points/show-points.component';
import { ShowWinnerComponent } from './components/show-winner/show-winner.component';

import { ComponentService } from './services/component.service';
import { AuthenticationService } from './services/authentication.service';
import { httpInterceptorProviders } from './services/interceptors/interseptors';
import { BankDataService } from './services/bank/bank-data.service';
import { ValidatorsMessagesService } from './services/validators/validators-messages.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
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
    FilterNewsService,
    FilterUsersService,
    BankDataService,
    AuthenticationService,
    ValidatorsMessagesService,
    httpInterceptorProviders
  ],
  entryComponents: [
    ShowPointsComponent,
    ShowWinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
