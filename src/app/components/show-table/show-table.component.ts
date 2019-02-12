import {Component, OnInit, Input, TemplateRef, ContentChild, ContentChildren, QueryList, AfterContentInit, AfterViewInit } from '@angular/core'
import {Observable, Subject} from 'rxjs';
import {FiltredValues, TableSetting} from '../../services/table-configs/setting-table';
import { debounceTime } from 'rxjs/operators';
import { TableRowDirective, CustomTableDirective, ColumnNameDirective, CellDeffDirective  } from '../../services/component.directive';


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit, AfterContentInit {

  @ContentChildren(ColumnNameDirective) contentChildren: QueryList<ColumnNameDirective>;

  @ContentChild(TableRowDirective, {read: TemplateRef}) tableRowTemplate;

  @ContentChild(CellDeffDirective, {read: TemplateRef}) cellDeffTemplate;





  @Input() tableSetting: Observable<TableSetting[]>;

  @Input() data: Observable<any[]>;

  filtredValues: FiltredValues[] = [];

  sourceData: any[];
  currentData: any[];

  subject: Subject<FiltredValues> = new Subject();

  constructor() {
  }


  ngAfterContentInit() {
    this.contentChildren.forEach(item => {
      console.log(item);
    });
    console.log(this.contentChildren);
  }

  ngOnInit() {
    this.data.subscribe( tableData => {
      this.currentData = tableData;
      this.sourceData = tableData;
    });
    this.tableSetting.subscribe(settings => {
      settings.forEach( item => {
        if (item.filter !== '') {
          this.filtredValues.push({name: item.name, value: ''});
        }
      });
    });

    this.subject
      .pipe(debounceTime(500))
      .subscribe(( filter ) => {
        this.filter(filter.name, filter.value);
      });
  }

  change(columnName: string, term) {
    this.subject.next({name: columnName, value: term});
  }

  filter(columnName: string, value) {
    this.filtredValues.forEach(item => {
      if (item.name === columnName) {
        item.value = value;
      }
    });

    this.currentData = this.sourceData.filter(row => {
      return this.filtredValues.every(filter => row[filter.name].indexOf(filter.value) > -1);
    });
  }

  trackByFn(index, item) {
    if (!item) return null;
    return index;
  }
}
