import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { News } from '../../services/news';

import { NEWS_URL } from '../../services/urls';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() amount: number;

  news: News[];

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.getJSON(NEWS_URL).subscribe(data => {
      this.news = data;
    });
    console.log(this.amount);
  }
}
