import { Directive, ViewContainerRef, Input } from '@angular/core';

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
  @Input() set columnName(nameC: string) {
    this.name = nameC;
  }
}
