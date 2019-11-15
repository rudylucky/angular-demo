import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, UserData, PageData, Option, SearchParam } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { Observable, of } from 'rxjs';
import HttpClientUtil from '@/commons/utils/httpclient';

@Injectable()
export class UserService implements BaseService<UserData> {

  private userData: Array<UserData>;

  constructor(private httpClient: HttpClientUtil) {
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

  update = (params: UserData): Promise<boolean> => {
    return null;
  }

  delete = (params: number): Promise<boolean> => {
    return null;
  }

  save = (params: UserData): Promise<boolean> => {
    return this.httpClient.post('/system/user/save', params);
  }

  search = (params: SearchParam): Promise<PageData<UserData>> => {
    return this.httpClient.post('/system/user/search', params);
  }

  list = (ids: Array<number>): Promise<Array<UserData>> => {
    return null;
  }

  info = (id: number): Promise<UserData> => {
    return null;
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
