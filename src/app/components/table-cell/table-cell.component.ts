import {Component, Input, OnInit, TemplateRef} from '@angular/core';


@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {

  @Input() innerTemplate: TemplateRef<any>;
  @Input() context: any;
  @Input() columnName: string;

  constructor() { }

  ngOnInit() {
  }
}
