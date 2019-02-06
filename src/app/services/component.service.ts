import { Injectable } from '@angular/core';

import { ComponentItem } from './component-item';
import { NewsComponent } from '../components/news/news.component';
import { UsersComponent } from '../components/users/users.component';
import { NewsFilterComponent } from '../components/news-filter/news-filter.component';
import { UsersFilterComponent } from '../components/users-filter/users-filter.component';
import { FilterNewsService } from './filter-news.servise';
import { FilterUsersService } from './filter-users.service';


@Injectable()
export class ComponentService {
  getData() {
    return [
      new ComponentItem(NewsComponent, 'news', NewsFilterComponent, FilterNewsService),
      new ComponentItem(UsersComponent, 'users', UsersFilterComponent, FilterUsersService),
    ];
  }
}
