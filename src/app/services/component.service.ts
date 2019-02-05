import { Injectable } from '@angular/core';

import { ComponentItem } from './component-item';
import { NewsComponent } from '../components/news/news.component';
import { UsersComponent } from '../components/users/users.component';


@Injectable()
export class ComponentService {
  getData() {
    return [
      new ComponentItem(NewsComponent, 'news'),
      new ComponentItem(UsersComponent, 'users'),
    ];
  }
}
