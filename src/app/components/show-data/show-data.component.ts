import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import {DataComponent, DataFilterComponent, IData} from '../../services/data-component';

import { ComponentItem } from '../../services/component-item';
import { ComponentService } from '../../services/component.service';
import {ComponentDirective, FilterDirective} from '../../services/component.directive';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss'],
})
export class ShowDataComponent implements OnInit {

  // amount: number;

  components: ComponentItem[];
  numberCurrentComponent: number;

  @ViewChild(ComponentDirective) componentHost: ComponentDirective;
  @ViewChild(FilterDirective) filterHost: FilterDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private componentService: ComponentService) { }

  ngOnInit() {
    this.components = this.componentService.getData();
  }

  showFilter(filterComponent: Type<DataFilterComponent>, componentNumber: number) {
    this.numberCurrentComponent = componentNumber;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(filterComponent);
    const viewContainerRef = this.filterHost.viewContainerRef;
    viewContainerRef.clear();
    /* const componentRef = viewContainerRef.createComponent(componentFactory); */
    viewContainerRef.createComponent(componentFactory);
    this.showData(this.components[this.numberCurrentComponent].route);
  }

  showData(component: Type<DataComponent<any>>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    /* const componentRef = viewContainerRef.createComponent(componentFactory); */
    viewContainerRef.createComponent(componentFactory);
  }
}
