import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsFilterComponent } from './news-filter.component';
import { FilterNewsService } from '../../services/filter-news.servise';

@NgModule({
  declarations: [NewsFilterComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    FilterNewsService
  ],
  exports: [
    NewsFilterComponent
  ]
})
export class NewsFilterModule { }
