import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';

import { ComponentItem } from '../../services/component-item';
import { ComponentService } from '../../services/component.service';
import { ComponentDirective } from '../../services/component.directive';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss'],
})
export class ShowDataComponent implements OnInit {

  amount: number;

  components: ComponentItem[];

  @ViewChild(ComponentDirective) componentHost: ComponentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private componentService: ComponentService) { }


  ngOnInit() {
    this.components = this.componentService.getData();
  }

  showData(component: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.amount = this.amount;
  }
}
