import { FilterService } from './filter.service';
import { UsersData } from './data-component';
import { Users } from './users';
import { Subject } from 'rxjs';
import { GetDataService } from './get-data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterUsersService implements FilterService {

  users: Users[];

  private triggerSource = new Subject<Users[]>();

  trigger = this.triggerSource.asObservable();

  constructor(private getDataService: GetDataService) {}

  filter(url: string, data: UsersData) {
    this.getDataService.getJSON(url).subscribe(res => {
      this.users = res;
      this.users = this.filterData(data);
      this.triggerSource.next(this.users);
    });
  }

  filterData(filterValues: UsersData): Users[] {
    return this.users.filter(item => {
      return item.firstName.indexOf(filterValues.userInfo) > -1 || item.lastName.indexOf(filterValues.userInfo) > -1;
    });
  }
}
