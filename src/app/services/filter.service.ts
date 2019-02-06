import {IData} from './data-component';

export interface FilterService {
  filter(url: string, data: IData);
}
