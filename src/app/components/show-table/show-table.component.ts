import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core'
import { Observable } from 'rxjs';
import { FiltredValues, TableSetting } from '../../services/table-configs/setting-table';
import { ColumnNameDirective,  } from '../../services/component.directive';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit, AfterContentInit, AfterViewChecked {

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

  controlForms: FormGroup;

  // Массив шаблонов для body
  bodyTemplates: TemplateRef<any>[] = [];

  // Список названий колонок, используется для передачи имени колонки в стандартный шаблон
  columnNames: string[] = [];

  constructor(private fb: FormBuilder,
              public cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.data.subscribe( tableData => {
      this.currentData = tableData;
      this.sourceData = tableData;
    });
    this.tableSetting.subscribe( settings => {
      // Формируем список используемых шаблонов
      settings.forEach(settingItem => {
        const templateIndex = this.isTemplate(settingItem.name, 'body');
        if ( templateIndex > -1 ) {
          // Добавляем настраеваемый шаблон
          this.bodyTemplates.push(this.getTemplateByIndex(templateIndex));
        } else {
          // Добавляем стандартный шаблон
          this.bodyTemplates.push(this.tableCellTemplate);
        }
        // инициализация массима содержащего список названия колонок
        this.columnNames.push(settingItem.name);
      });
      this.initFormsCotrol();
    });
  }

  ngAfterViewChecked(): void {
  }

  ngAfterContentInit() {

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

  // Есть ли шаблон с форм контролем для данной колонки
  isColumnFilter(columnName): boolean {
    return this.isTemplate(columnName, 'filter') > -1;
  }

  // получить шаблон с форм контроль
  getColumnFilter(columnName) {
    const filterTemplateIndex = this.isTemplate(columnName, 'filter');
    return this.getTemplateByIndex(filterTemplateIndex);
  }

  // Получить индекс шаблона передав имя калонки
  isTemplate(columnName: string, cellType): number {
    let indexTemplatate = -1;
    this.contentChildrenName.forEach((template, index) => {
      if (template.name === columnName && template.cellType === cellType) {
        indexTemplatate = index;
      }
    });
    return indexTemplatate;
  }

  // Инициализация контроля форм для фильтрации таблицы
  initFormsCotrol() {
    this.controlForms = this.fb.group({});
    this.tableSetting.subscribe(settings => {
      settings.forEach(settingItem => {
        if (settingItem.filter === 'true') {
          this.controlForms.addControl(settingItem.name, new FormControl(''));
        }
      });
    })
    this.controlForms.valueChanges.subscribe(item => {
      this.newFilter(item);
    });
  }



  newFilter(newValues) {
    this.currentData = this.sourceData.filter(row => {
      for (const key in newValues) {
        if (row[key].indexOf(newValues[key]) > -1 || newValues[key] === null) {
          // есть совпадения
        } else {
          return false;
        }
      }
      return true;
    });
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

  disable() {
    this.cd.detach();
  }

  enable() {
    this.cd.reattach();
  }
}
