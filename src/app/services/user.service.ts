import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, UserData, PageData, Option, SearchParam } from './service-interface';
import _ from '@/commons/utils';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements BaseService<UserData> {

  private userData: Array<UserData>;

  constructor(private http: HttpClient) {
    this.mockData();
  }

  private mockData(): void {
    if (this.userData) {
      return;
    }
    this.userData = Array(200).fill({}).map((item, index) => ({
      id: index,
      username: 'name' + index,
      gender: _.range(1),
      email: 'email' + index,
      age: index,
      censusRegister: '江苏',
      degree: _.range(4),
      inPosition: _.range(),
      regular: _.range()
    }));
  }

  getUserData() {
    return _.clone(this.userData);
  }

  update(params: UserData): Observable<boolean> {
    return of(true);
  }

  delete(params: number): Observable<boolean> {
    return of(true);
  }

  save(params: UserData): Observable<boolean> {
    return of(true);
  }

  search = (params: SearchParam): Observable<PageData<UserData>> => {
    const { pageSize, pageIndex } = params;
    const startIndex = (pageIndex - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    endIndex = endIndex > this.userData.length ? this.userData.length : endIndex;
    return of(new PageData(pageSize, pageIndex, this.userData.length, this.getUserData().slice(startIndex, endIndex)));
  }

  list = (ids: Array<number>): Observable<Array<UserData>> => {
    return of(this.getUserData().filter(v => ids.includes(v.id)));
  }

  info = (id: number): Observable<UserData> => {
    return of(this.getUserData().find(v => v.id === id));
  }

  listGenderType(): Observable<Array<Option>> {
    return of([{
      value: 0,
      title: '男'
    }, {
      value: 1,
      title: '女'
    }]);
  }

  listDegreeType(): Observable<Array<Option>> {
    return of([{
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
    }]);
  }
}
