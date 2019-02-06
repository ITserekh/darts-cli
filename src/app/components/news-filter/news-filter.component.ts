import { Component, OnInit } from '@angular/core';
import { DataFilterComponent, NewsData } from '../../services/data-component';
// import { News } from '../../services/news';
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

  // news: News[];

  constructor(private getDataService: GetDataService,
              private filterNewsService: FilterNewsService) { }

  ngOnInit() {
    this.data = {numberOfDays: 0, filter: ''};
    // this.getDataService.getJSON(NEWS_URL).subscribe(data => {
    //  this.news = data;
    // });
    // this.filterNewsService.filter(NEWS_URL);
  }

  filter() {
    this.filterNewsService.filter(NEWS_URL, this.data);
  }
}
