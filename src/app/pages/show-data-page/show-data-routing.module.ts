import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDataPageComponent } from './show-data-page.component';


const routes: Routes = [
  {
    path: '',
    component: ShowDataPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowDataRoutingModule { }
