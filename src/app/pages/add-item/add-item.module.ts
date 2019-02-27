import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AddItemRoutingModule } from './add-item-routing.module';
import { AddItemComponent } from './add-item.component';

import { BankTableComponent } from '../../components/bank-table/bank-table.component';
import { CustomTableModule } from '../../custom-table.module';
import { AddDocumentModule } from '../../components/add-document/add-document.module';
import { MaskDirectivesModule } from '../../directives/mask-directives/mask-directives.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AddItemComponent,
    BankTableComponent
  ],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomTableModule,
    AddDocumentModule,
    MaskDirectivesModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    })
  ]
})
export class AddItemModule { }
