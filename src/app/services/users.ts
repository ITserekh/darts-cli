export interface Users {
  firstName: string;
  lastName: string;
}

export interface Users2 {
  userId: string;
  firstName: string;
  lastName: string;
  age: string;
  date: string;
  avatar: string;
}

export interface DocumentsGridInterface {
  clientId: number;
  clientName: string;
  createDate: string;
  documentNumber: string;
  statusName: string;
}

export interface FiltredValues {
  columnName: string;
  columnValue: string;
}
