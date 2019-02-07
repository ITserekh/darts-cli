import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersFilterComponent } from './users-filter.component';
import { FilterUsersService} from '../../services/filter-users.service';

@NgModule({
  declarations: [UsersFilterComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    FilterUsersService
  ],
  exports: [
    UsersFilterComponent
  ]
})
export class UsersFilterModule { }
