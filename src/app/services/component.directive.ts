import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

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

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set columnName(columnName: string) {
    if (columnName) {
      console.log('---------- name ---------- ', columnName);
      this.name = columnName;
      this.viewContainer.createEmbeddedView(this.templateRef, {});
    } else {
      this.viewContainer.clear();
    }
  }
}

@Directive({
  selector: '[cellDeff]'
})
export class CellDeffDirective {}
