export interface DataComponent<T extends IData> {
  data: T;
}

export interface DataFilterComponent {
  filter();
}


export interface IData {
  dataF?: string;
}

export interface NewsData extends IData {
  numberOfDays: number;
  filter: string;
}

export interface UsersData extends IData {
  Id: number;
  userInfo: string;
}

