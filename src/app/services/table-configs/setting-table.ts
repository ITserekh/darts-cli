export interface TableSetting {
  name: string;
  title: string;
  filter: string;
}

export interface FiltredValues {
  name: string;
  value: string;
}

export interface CurrentSoringValues {
  name: string; // название сортируемой колонки
  value: string; // значение направления сортировки (asc, dsc)
}

// Значения для сортировки передаваемые на сервер
export interface SortingDirection {
  up: string;
  down: string;
}
