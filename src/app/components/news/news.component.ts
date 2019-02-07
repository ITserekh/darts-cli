import { Component, OnInit} from '@angular/core';
import { DataComponent, NewsData } from '../../services/data-component';
import { News } from '../../services/news';
import { FilterNewsService } from '../../services/filter-news.servise';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, DataComponent<NewsData> {

  // news: News[];

  data: NewsData;

  dataAsync: Observable<News[]>;

  constructor(private filterNewsService: FilterNewsService) {
    this.dataAsync = filterNewsService.trigger;
  }

  ngOnInit() {
  }

}
