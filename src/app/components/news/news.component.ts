import { Component, OnInit} from '@angular/core';
import { DataComponent, NewsData } from '../../services/data-component';
import { News } from '../../services/news';
import { FilterNewsService } from '../../services/filter-news.servise';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, DataComponent<NewsData> {

  news: News[];

  data: NewsData;

  constructor(private filterNewsService: FilterNewsService) {
    console.log('news');
    filterNewsService.trigger.subscribe(res => {
      console.log(res);
      this.news = res});
  }

  ngOnInit() {
    // this.news = this.filterNewsService.getFiltredNews();
  }

}
