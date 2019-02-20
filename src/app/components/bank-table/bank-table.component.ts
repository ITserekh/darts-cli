import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableSetting } from '../../services/table-configs/setting-table';
import { BankDataService } from '../../services/bank/bank-data.service';

@Component({
  selector: 'app-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.scss']
})
export class BankTableComponent implements OnInit {

  currentPage: number;
  lastPage: number;
  itemsPerPage: number = 5;

  serchValue: string;

  documentsGrid = [];

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


  getDocumentsGrid() {
    this.bankDataService.getDocumentsGrid(this.serchValue, this.currentPage, this.itemsPerPage).subscribe(data => {
      console.log(data);
      this.lastPage = Math.floor(data.items / this.itemsPerPage);
      this.documentsGrid = data.dataTable;
    });
  }

  search() {
    this.currentPage = 1;
    this.getDocumentsGrid();
  }

  nextPage() {
    this.currentPage++;
    this.getDocumentsGrid();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDocumentsGrid();
    }
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getDocumentsGrid();
  }
}
