import { Injectable } from '@angular/core';
import { BaseService, UserData, SearchParam, PageData, Option } from '@/commons/interfaces/service-interface';
import HttpClientUtil from '@/commons/utils/httpclient';
import { Observable, of } from 'rxjs';
import { SystemModule } from '@/system/system.module';
import _ from '@/commons/utils/utils';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService implements BaseService<UserData> {

  constructor(private httpClient: HttpClient) {
  }

  get = (params: SearchParam) => {
  }

  do() {
    return this.httpClient.post('http://localhost:5000/system/user/info', _.queryString({code: 'a'})).toPromise();
  }

  search = (params: SearchParam): Observable<PageData<UserData>> => {
    return null;
  }

  list = (params: number[]): Observable<UserData[]> => {
    throw new Error("Method not implemented.");
  }
  info = (params: number): Observable<UserData> => {
    throw new Error("Method not implemented.");
  }
  update = (params: UserData): Observable<boolean> => {
    throw new Error("Method not implemented.");
  }
  delete = (params: number): Observable<boolean> => {
    throw new Error("Method not implemented.");
  }
  save = (params: UserData): Observable<boolean> => {
    throw new Error("Method not implemented.");
  }

  listGenderType = (): Observable<Array<Option>> => {
    return of([{
      value: 0,
      title: '男'
    }, {
      value: 1,
      title: '女'
    }]);
  }

  listDegreeType = (): Observable<Array<Option>> => {
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
