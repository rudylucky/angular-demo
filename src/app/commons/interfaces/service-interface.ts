import { Observable } from 'rxjs';
import HttpClientUtil from '../utils/httpclient';

export interface SearchParam {
  pageSize: number;
  currentPage: number;
}

export abstract class BaseService<T extends DataItem> {

  constructor(protected httpClient: HttpClientUtil) {
  }

  protected abstract prefix(): string;

  update = (params: T): Observable<boolean> => {
    return this.httpClient.post(`${this.prefix()}/update`, params);
  }

  delete = (ids: number | Array<number>): Observable<boolean> => {
    return this.httpClient.delete(`${this.prefix()}/delete`, { ids });
  }

  save = (params: T): Observable<boolean> => {
    return this.httpClient.post(`${this.prefix()}/save`, params);
  }

  search = (params: SearchParam): Observable<PageData<T>> => {
    return this.httpClient.post(`${this.prefix()}/search`, params);
  }

  list = (param?: T): Observable<Array<T>> => {
    return this.httpClient.post(`${this.prefix()}/list`, param || {});
  }

  info = (code: number): Observable<T> => {
    return this.httpClient.get(`${this.prefix()}/info`, { code });
  }

}

export class PageData<T> {
  pageSize: number;
  currentPage: number;
  total: number;
  records: Array<T>;

  constructor(pageSize: number, pageIndex: number, total: number, records: T[]) {
    this.pageSize = pageSize;
    this.currentPage = pageIndex;
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
  width?: number | string;
  multiple?: boolean;
  render?: (value) => any;
}

export interface DataItem {
  id?: number;
  code?: string;
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
  UPLOAD = 9,
  MULTI_SELECT = 10
}

export interface Option {
  value: boolean | number | string;
  title: string;
}
