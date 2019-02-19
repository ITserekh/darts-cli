import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Input() page: number;
  @Input() lastPage: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  currentPageNumber: number = 0;

  constructor() { }

  ngOnInit() {
  }

  previuosPage() {
    this.goPrev.emit();
  }

  nextPage() {
    this.goNext.emit();
  }

  onPage(numberPage: number) {
    this.goPage.emit(numberPage);
  }
}
