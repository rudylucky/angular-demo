import { Observable } from 'rxjs';

export interface SearchParams {
  pageSize: number;
  pageIndex: number;
}

export interface ListParams {
  [index: number]: number;
}

export interface UpdateParams {
  id: number;
}

export interface BaseService<T> {
  search(params): Observable<PageData<T>>;
}

export interface UserData extends DataItem {
  username: string;
  gender: number;
  email: string;
  age: number;
  censusRegister: string;
  degree: number;
  inPosition: number;
  regular: number;
}

export class PageData<T> {
  pageSize: number;
  pageIndex: number;
  total: number;
  records: Array<T>;

  constructor(pageSize: number, pageIndex: number, total: number, records: T[]) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.total = total;
    this.records = records;
  }
}

export interface Column {
  title: string;
  dataIndex?: string;
  type?: InputType;
  options?: Array<Option>;
  required?: boolean;
  searchable?: boolean;
  width?: number;
  render?: (value) => any;
}

export interface DataItem {
  id: number;
}

export interface TableData {
  [index: number]: DataItem;
}

export enum InputType {
  INPUT = 0,
  SELECT = 1,
  CHECKBOX = 2,
  NUMBER = 3,
  DATE = 4,
  TIME = 5,
  DATETIME = 6,
  RADIO = 7,
  SWITCH = 8,
  UPLOAD = 9
}

export interface Option {
  value: number;
  title: string;
}
