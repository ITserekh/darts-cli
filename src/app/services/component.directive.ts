import { Directive, ViewContainerRef } from '@angular/core';

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
