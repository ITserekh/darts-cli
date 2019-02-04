import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { Users } from '../../services/users';

import { USER_URL } from '../../services/urls';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() amount: number;

  users: Users[];

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.getJSON(USER_URL).subscribe(data => {
      this.users = this.filter(data);
    });
  }

  filter(data: Users[]): Users[] {
    return data.filter( (news, index) => {
      return index < this.amount;
    });
  }
}
