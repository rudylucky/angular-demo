import { Observable } from 'rxjs';
import HttpClientUtil from '../utils/httpclient';

export interface SearchParam {
  pageSize: number;
  currentPage: number;
}

export abstract class BaseService<T> {

  constructor(protected httpClient: HttpClientUtil) {
  }

  protected abstract prefix(): string;

  update = (params: DataItem): Promise<boolean> => {
    return this.httpClient.post(`${this.prefix()}/update`, params);
  }

  delete = (ids: number | Array<number>): Promise<boolean> => {
    return this.httpClient.delete(`${this.prefix()}/delete`, { ids });
  }

  save = (params: DataItem): Promise<boolean> => {
    return this.httpClient.post(`${this.prefix()}/save`, params);
  }

  search = (params: SearchParam): Promise<PageData<DataItem>> => {
    return this.httpClient.post(`${this.prefix()}/search`, params);
  }

  list = (ids: Array<number>): Promise<Array<DataItem>> => {
    return this.httpClient.post(`${this.prefix()}/list`, ids);
  }

  info = (code: number): Promise<DataItem> => {
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
  render?: (value) => any;
}

export interface DataItem {
  id: number;
  code: string;
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
  value: boolean | number;
  title: string;
}
