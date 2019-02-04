import { Type } from '@angular/core';

export class ComponentItem {
  constructor(public route: Type<any>, public name: string) {}
}
