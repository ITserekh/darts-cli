import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild
} from '@angular/core'
import {Observable, Subject} from 'rxjs';
import {FiltredValues, TableSetting} from '../../services/table-configs/setting-table';
import { debounceTime } from 'rxjs/operators';
import { ColumnNameDirective,  } from '../../services/component.directive';


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit, AfterContentInit {

  // Получает список шаблонов(templates) описаных внутри компоненты, не получает передаваемые значения
  @ContentChildren(ColumnNameDirective, {read: TemplateRef}) contentChildren: QueryList<ColumnNameDirective>;
  // Для хранения значений передаваемых в шаблоне
  @ContentChildren(ColumnNameDirective) contentChildrenName: QueryList<ColumnNameDirective>;
  // Стандартный шаблон
  @ViewChild('tableCell', {read: TemplateRef}) tableCellTemplate;

  @Input() tableSetting: Observable<TableSetting[]>;

  @Input() data: Observable<any[]>;

  filtredValues: FiltredValues[] = [];

  sourceData: any[];
  currentData: any[];

  subject: Subject<FiltredValues> = new Subject();

  // Массив шаблонов
  templates: TemplateRef<any>[] = [];

  // Список названий колонок, используется для передачи имени колонки в стандартный шаблон
  columnNames: string[] = [];

  constructor() {
  }


  ngAfterContentInit() {
    this.tableSetting.subscribe( settings => {
      // Формируем список используемых шаблонов
      settings.forEach(settingItem => {
        const templateIndex = this.isTemplate(settingItem.name);
        if ( templateIndex > -1 ) {
          // Добавляем настраеваемый шаблон
          this.templates.push(this.getTemplateByIndex(templateIndex));
        } else {
          // Добавляем стандартный шаблон
          this.templates.push(this.tableCellTemplate);
        }
      });
    });
  }

  // Получить шаблон из списка шаблонов по индексу
  getTemplateByIndex(templateIndex): any {
    return this.contentChildren.find((template, index) => {
      return templateIndex === index;
    });
  }

  // Получить имя колонки по индексу, костыль для передачи имени в стандартный шаблон
  getColumnName(index): string {
    return this.columnNames[index];
  }

  // Получить индекс шаблона передав имя калонки
  isTemplate(columnName: string) {
    let indexTemplatate = -1;
    this.contentChildrenName.forEach((template, index) => {
      if (template.name === columnName) {
        indexTemplatate = index;
      }
    });
    return indexTemplatate;
  }

  ngOnInit() {
    this.data.subscribe( tableData => {
      this.currentData = tableData;
      this.sourceData = tableData;
    });
    this.tableSetting.subscribe(settings => {
      settings.forEach( item => {
        this.columnNames.push(item.name);
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
