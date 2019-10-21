import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class UserInfo {
  name: string;
  key: string;
  gender: string;
  email: string;
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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(pageSize: number, pageIndex: number): PageData<UserInfo> {
    const arr = Array(200).fill({}).map((item, index) => ({
      name: 'name' + index,
      key: 'key' + index,
      gender: 'gender' + index,
      email: 'email' + index
    }));
    const startIndex = (pageIndex - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    endIndex = endIndex > arr.length ? arr.length : endIndex;
    return new PageData(pageSize, pageIndex, arr.length, arr.slice(startIndex, endIndex));
  }

}
