import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AddItemRoutingModule } from './add-item-routing.module';
import { AddItemComponent } from './add-item.component';

@NgModule({
  declarations: [ AddItemComponent ],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AddItemModule { }
