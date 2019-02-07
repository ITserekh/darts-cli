import { Component, OnInit } from '@angular/core';
import { DataFilterComponent, NewsData } from '../../services/data-component';
import { GetDataService } from '../../services/get-data.service';
import { NEWS_URL } from '../../services/urls';
import { FilterNewsService } from '../../services/filter-news.servise';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss']
})
export class NewsFilterComponent implements OnInit, DataFilterComponent {

  data: NewsData;

  constructor(private getDataService: GetDataService,
              private filterNewsService: FilterNewsService) { }

  ngOnInit() {
    this.data = {numberOfDays: 0, filter: ''};
  }

  filter() {
    this.filterNewsService.filter(NEWS_URL, this.data);
  }
}
