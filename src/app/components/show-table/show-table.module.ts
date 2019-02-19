import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowTableComponent } from './show-table.component';
import { GetDataService } from '../../services/get-data.service';
import {ShowDataModule} from '../../pages/show-data-page/show-data.module';
import {DirectivesModule} from '../../derectives/directives.module';

@NgModule({
  declarations: [
    ShowTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShowDataModule,
    DirectivesModule
  ],
  providers: [
    GetDataService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ShowTableModule { }
