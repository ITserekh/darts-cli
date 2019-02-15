import {Component, Input, OnInit, TemplateRef, ChangeDetectionStrategy, AfterViewChecked, AfterContentInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableBodyComponent implements OnInit, AfterViewChecked, AfterContentInit, DoCheck {

  @Input() templates: TemplateRef<any>[];
  @Input() currentData: any[];
  @Input() columnNames: string[];

  check = 0;

  constructor() { }

  ngOnInit() {
  }

  getColumnName(index): string {
    return this.columnNames[index];
  }

  ngDoCheck() {
    this.check = this.check + 1;
  }

  ngAfterViewChecked() {
  }

  ngAfterContentInit() {
  }
}
