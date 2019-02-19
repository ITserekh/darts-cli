import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: 'hello',
    loadChildren: './pages/hello-page/hello-page.module#HelloPageModule'
  },
  {
    path: 'setting',
    loadChildren: './pages/setting/setting.module#SettingModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'game',
    loadChildren: './pages/game/game.module#GameModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'show',
    loadChildren: './pages/show-data-page/show-data.module#ShowDataModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    // data: { expectedRole: 'admin'}
  },
  {
    path: 'login',
    loadChildren: './pages/login-page/login-page.module#LoginPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'item',
    loadChildren: './pages/add-item/add-item.module#AddItemModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'hello',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'hello'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
