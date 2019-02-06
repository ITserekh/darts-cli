import { FilterService } from './filter.service';
import { Injectable } from '@angular/core';
import { GetDataService } from './get-data.service';
import { NewsData } from './data-component';
import { News } from './news';
import { Subject } from 'rxjs';


@Injectable()
export class FilterNewsService implements FilterService {

  news: News[] = [];

  private triggerSource = new Subject<News[]>();

  trigger = this.triggerSource.asObservable();

  constructor(private getDataService: GetDataService) {}

  filter(url: string, data: NewsData) {
    this.getDataService.getJSON(url).subscribe(res => {
      this.news = res;
      this.triggerSource.next(this.news);
    });
    console.log('Filter News Service');

  }

  getFiltredNews() {
    return this.news;
  }

  /*

  filter(filterValues: NewsData) {
    const result =
      this.news.filter(item => {
        return item.text.indexOf(filterValues.filter) > -1 || item.title.indexOf(filterValues.filter) > -1;
      }).filter(item => {
        return this.isInPeriod(item.date, filterValues.numberOfDays); // isPeriod
      });
    // this.onFilter.emit(result);
  }

  isInPeriod(date: string, numberOfDays) {
    const today: number = +(new Date().toISOString().substring(0, 10).slice(-2)); // date format 2019-01-31
    const checkDay: number = +date.slice(-2);

    // TODO refactoring
    return !numberOfDays ? true : today - checkDay < numberOfDays;
  }
   */
}
