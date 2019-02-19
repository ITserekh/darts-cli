import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AddItemRoutingModule } from './add-item-routing.module';
import { AddItemComponent } from './add-item.component';

@NgModule({
  declarations: [ AddItemComponent ],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddItemModule { }
