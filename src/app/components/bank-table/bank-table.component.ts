import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableSetting, CurrentSoringValues, SortingDirection } from '../../services/table-configs/setting-table';
import { BankDataService } from '../../services/bank/bank-data.service';
import {DocumentsGridInterface} from '../../services/users';

@Component({
  selector: 'app-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.scss']
})
export class BankTableComponent implements OnInit {

  currentPage: number;
  lastPage: number;
  itemsPerPage: number = 5;

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

  documentsGrid: DocumentsGridInterface[] = [];

  tableSetting: Observable<TableSetting[]> = of([
    { name: 'clientId', title: 'ID', filter: 'false' },
    { name: 'clientName', title: 'Name', filter: 'true' },
    { name: 'createDate', title: 'Create Date', filter: 'true' },
    { name: 'documentNumber', title: 'Document Number', filter: 'false' },
    { name: 'statusName', title: 'Status Name', filter: 'false'}
  ]);

  constructor(private bankDataService: BankDataService) { }

  ngOnInit() {
  }

  // Получить данные с сервера
  getDocumentsGrid() {
    this.bankDataService.getDocumentsGrid(this.serchValue, this.currentPage, this.itemsPerPage,
      this.currentSortingValues.name,
      this.currentSortingValues.value).subscribe(data => {
      console.log(data);
      this.lastPage = Math.floor(data.items / this.itemsPerPage);
      this.documentsGrid = data.dataTable;
    });
  }

  // Поиск данных
  search() {
    this.currentPage = 1;
    this.getDocumentsGrid();
  }

  // Переход на следующую страницу
  nextPage() {
    this.currentPage++;
    this.getDocumentsGrid();
  }

  // Переход на предыдущую страницу
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDocumentsGrid();
    }
  }

  // Переход на страницу с номером pageNumber
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getDocumentsGrid();
  }

  // Установить новые значения сортировки и получить данные с новой сортировкой
  setSorting(sortingSetting: CurrentSoringValues) {
    this.currentSortingValues = sortingSetting;
    this.getDocumentsGrid();
  }
}
