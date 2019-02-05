import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'setting',
    loadChildren: './pages/setting/setting.module#SettingModule'
  },
  {
    path: 'game',
    loadChildren: './pages/game/game.module#GameModule'
  },
  {
    path: 'show',
    loadChildren: './pages/show-data-page/show-data.module#ShowDataModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login-page/login-page.module#LoginPageModule'
  },
  {
    path: '',
    redirectTo: 'setting',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
