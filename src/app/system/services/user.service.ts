import { Injectable } from '@angular/core';
import { BaseService, UserData, SearchParam, PageData, Option } from '@/commons/interfaces/service-interface';
import HttpClientUtil from '@/commons/utils/httpclient';
import { Observable, of } from 'rxjs';
import { SystemModule } from '@/system/system.module';

@Injectable()
export class UserService implements BaseService<UserData> {

  constructor(private httpClient: HttpClientUtil) {
  }

  get = (params: SearchParam) => {
    return this.httpClient.post('http://192.168.1.134:5000/system-service/sys/user/info', params).toPromise();
  }

  search = (params: SearchParam): Observable<PageData<UserData>> => {
    return this.httpClient.post('http://192.168.1.134:5000/system-service/sys/user/info', params);
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
