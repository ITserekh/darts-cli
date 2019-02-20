import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableSetting, CurrentSoringValues, SortingDirection } from '../../services/table-configs/setting-table';
import { BankDataService } from '../../services/bank/bank-data.service';
import {DocumentsGridInterface, FiltredValues } from '../../services/users';



@Component({
  selector: 'app-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.scss']
})
export class BankTableComponent implements OnInit {

  lastPage: number;
  itemsPerPage = 5;

  // Значения сортировок для сервера
  sortingDirection: SortingDirection = {
    up: 'asc',
    down: 'desc'
  }

  // Значения текущей сортировки
  currentSortingValues: CurrentSoringValues = {
    name: 'clientId',
    value: this.sortingDirection.up
  }

  serchValue: string;

  filtredValues: FiltredValues[] = [];

  documentsGrid: DocumentsGridInterface[] = [];

  tableSetting: Observable<TableSetting[]> = of([
    { name: 'clientId', title: 'ID', filter: 'false' },
    { name: 'clientName', title: 'Name', filter: 'true' },
    { name: 'createDate', title: 'Create Date', filter: 'false' },
    { name: 'documentNumber', title: 'Document Number', filter: 'false' },
    { name: 'statusName', title: 'Status Name', filter: 'false'}
  ]);

  question = {
    sort: {
      columnName: this.currentSortingValues.name,
      columnValue: this.currentSortingValues.value
    },
    sortList: [
      {
        columnName: this.currentSortingValues.name,
        columnValue: this.currentSortingValues.value
      }
      ],
    filterLike: this.filtredValues,
    filterIntervalList: [],
    filterDateIntervalList: [],
    numberOfPage: 1,
    itemsPerPage: this.itemsPerPage,
    dateFrom: '',
    dateTo: ''};

  constructor(private bankDataService: BankDataService) { }

  ngOnInit() {
    this.filtredValues.push({columnName: 'allInOne', columnValue: ''});
    this.tableSetting.subscribe(settings => {
      settings.forEach(item => {
        if (item.filter.indexOf('true') > -1) {
          this.filtredValues.push({columnName: item.name, columnValue: ''});
        }
      });
    });
  }

  // Получить данные с сервера
  getDocumentsGrid() {
    if (this.filtredValues[0].columnValue.length > 0) { // если есть поисковый запрос
    this.bankDataService.getDocumentsGrid(this.question).subscribe(data => {
      console.log(data);
      this.lastPage = Math.ceil(data.items / this.itemsPerPage);
      this.documentsGrid = data.dataTable;
    });
    }
  }

  filter(searchValue: any) {
    this.question.numberOfPage = 1;
    for (const key in searchValue) {
      this.filtredValues.forEach( item => {
        if(item.columnName.indexOf(key) > -1 ) {
          item.columnValue = searchValue[key];
        }
      });
    }
    this.getDocumentsGrid();
  }

  // Поиск данных
  search() {
    this.question.numberOfPage = 1;
    this.getDocumentsGrid();
  }

  // Переход на следующую страницу
  nextPage() {
    this.question.numberOfPage++;
    this.getDocumentsGrid();
  }

  // Переход на предыдущую страницу
  previousPage() {
    if (this.question.numberOfPage > 1) {
      this.question.numberOfPage--;
      this.getDocumentsGrid();
    }
  }

  // Переход на страницу с номером pageNumber
  goToPage(pageNumber: number) {
    this.question.numberOfPage = pageNumber;
    this.getDocumentsGrid();
  }

  // Установить новые значения сортировки и получить данные с новой сортировкой
  setSorting(sortingSetting: CurrentSoringValues) {
    this.question.sort.columnName = sortingSetting.name;
    this.question.sort.columnValue = sortingSetting.value;
    this.getDocumentsGrid();
  }
}
