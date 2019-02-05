import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlayerComponent } from './add-player.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddPlayerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AddPlayerComponent],
  entryComponents: [
    AddPlayerComponent
  ]
})
export class AddPlayerModule { }
