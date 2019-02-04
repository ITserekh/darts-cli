import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingPageComponent } from './pages/setting/setting-page.component';
import { GamePageComponent } from './pages/game/game-page.component';
import { ShowDataPageComponent } from './pages/show-data-page/show-data-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'setting', component: SettingPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'show', component: ShowDataPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
