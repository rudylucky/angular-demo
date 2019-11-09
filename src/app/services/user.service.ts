import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Options } from '@/components/input/input.component';
import { DataItem } from '@/components/base/search-table/search-table.component';

export interface UserInfo extends DataItem {
  username: string;
  key: string;
  gender: number;
  email: string;
  age: number;
  censusRegister: string;
  degree: number;
}

export class PageData<T> {
  pageSize: number;
  pageIndex: number;
  total: number;
  records: T[];

  constructor(pageSize: number, pageIndex: number, total: number, records: T[]) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.total = total;
    this.records = records;
  }
}

interface Params {
  pageSize: number;
  pageIndex: number;
}

export interface BaseService<T> {
  list(params): PageData<T>;
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements BaseService<UserInfo> {

  constructor(private http: HttpClient) { }

  list(params: Params): PageData<UserInfo> {
    const { pageSize, pageIndex } = params;
    const arr = Array(200).fill({}).map((item, index) => ({
      username: 'name' + index,
      key: 'key' + index,
      gender: 0,
      email: 'email' + index,
      age: index,
      censusRegister: '江苏',
      degree: 0
    }));
    const startIndex = (pageIndex - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    endIndex = endIndex > arr.length ? arr.length : endIndex;
    return new PageData(pageSize, pageIndex, arr.length, arr.slice(startIndex, endIndex));
  }

  listGenderType(): Options {
    return [{
      value: 0,
      title: '男'
    }, {
      value: 1,
      title: '女'
    }];
  }

  listDegreeType(): Options {
    return [{
      value: 0,
      title: '小学',
    }, {
      value: 1,
      title: '初中',
    }, {
      value: 2,
      title: '本科',
    }, {
      value: 3,
      title: '硕士',
    }, {
      value: 4,
      title: '博士',
    }];
  }

}
