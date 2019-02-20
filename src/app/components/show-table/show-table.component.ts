import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ContentChildren,
  QueryList,
  ViewChild,
  ChangeDetectorRef,
  OnChanges,
  AfterContentInit, Output, EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TableSetting, CurrentSoringValues, SortingDirection } from '../../services/table-configs/setting-table';
import { ColumnNameDirective,  } from '../../services/component.directive';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss'],
})
export class ShowTableComponent implements OnInit, OnChanges, AfterContentInit {

  // Получает список шаблонов(templates) описаных внутри компоненты, не получает передаваемые значения
  @ContentChildren(ColumnNameDirective, {read: TemplateRef}) contentChildren: QueryList<ColumnNameDirective>;
  // Для хранения значений передаваемых в шаблоне
  @ContentChildren(ColumnNameDirective) contentChildrenName: QueryList<ColumnNameDirective>;
  // Стандартный шаблон
  @ViewChild('tableCell', {read: TemplateRef}) tableCellTemplate;

  @Input() tableSetting: Observable<TableSetting[]>;

  @Input() data: any[];

  @Input() sortinDirection: SortingDirection;

  @Output() sorting = new EventEmitter<CurrentSoringValues>(); // первый элемент имя колонки, второй - тип сортировки

  sourceData: any[] = [];
  currentData: any[] = [];

  controlForms: FormGroup;

  // Массив шаблонов для body
  bodyTemplates: TemplateRef<any>[] = [];

  // Список названий колонок, используется для передачи имени колонки в стандартный шаблон
  columnNames: string[] = [];

  currentSortValues: CurrentSoringValues;

  constructor(private fb: FormBuilder,
              public cd: ChangeDetectorRef) {
  }

  ngOnChanges() {
    this.sourceData = this.data;
    this.currentData = this.data;
  }

  ngOnInit() {
    this.tableSetting.subscribe( settings => {
      // Формируем названия колонок и форм контролов для фильтрациии колонок
      settings.forEach(settingItem => {
        this.columnNames.push(settingItem.name);
      });
      this.initFormsCotrol();
      // инициализация начальной сортировки
      this.currentSortValues =  {
        name: settings[0].name,
        value: 'asc'
      };
    });
  }

  ngAfterContentInit(): void {
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
  isTemplate(columnName: string, cellType: string): number {
    let indexTemplatate = -1;
    if (this.contentChildrenName) {
      this.contentChildrenName.forEach((template, index) => {
        if (template.name === columnName && template.cellType === cellType) {
          indexTemplatate = index;
        }
      });
    }
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

    // Подписка на ввод фильтруемых значений с задержкой с задержкой 500мс
    this.controlForms.valueChanges.pipe(debounceTime(500)).subscribe(item => {
      this.filter(item);
    });
  }

  filter(newValues) {
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

  trackByFn(index, item) {
    if (!item) return null;
    return index;
  }

  // Сортировка колонки с именем columnName
  goSorting(columnName: string) {
    if (this.currentSortValues.name.indexOf(columnName) > -1) { // сортировка той же колонки в обратном порядке
      if (this.currentSortValues.value.indexOf(this.sortinDirection.up) > -1) { // переключаем сортировке
        this.currentSortValues.value = this.sortinDirection.down;
      } else {
        this.currentSortValues.value = this.sortinDirection.up;
      }
    } else { // сортировка по умолчанию up
      this.currentSortValues.name = columnName;
      this.currentSortValues.value = this.sortinDirection.up;
    }
    this.sorting.emit(this.currentSortValues);
  }
}
