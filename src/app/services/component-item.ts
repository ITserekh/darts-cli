import {Injectable, Type} from '@angular/core';
import {DataComponent, DataFilterComponent, IData} from './data-component';
import {FilterService} from './filter.service';

@Injectable()
export class ComponentItem {
  constructor(public route: Type<DataComponent<IData>>,
              public name: string,
              public filter: Type<DataFilterComponent>) {}
}
