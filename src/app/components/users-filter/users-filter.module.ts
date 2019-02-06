import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFilterComponent } from './users-filter.component';

@NgModule({
  declarations: [UsersFilterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UsersFilterComponent
  ]
})
export class UsersFilterModule { }
