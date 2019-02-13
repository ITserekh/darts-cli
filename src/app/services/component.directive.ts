import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[component-host]'
})
export class ComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

@Directive({
  selector: '[filter-host]'
})
export class FilterDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[tableRow]'
})
export class TableRowDirective {}

@Directive({
  selector: '[customTable]'
})
export class CustomTableDirective {}


@Directive({
  selector: '[columnName]'
})
export class ColumnNameDirective {
  name: string;

  @Input() set columnName(columnName: string) {
    this.name = columnName;
  }

  @Input() cellType: string;
}

@Directive({
  selector: '[cellDeff]'
})
export class CellDeffDirective {}
