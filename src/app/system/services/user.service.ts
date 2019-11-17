import { Injectable, Inject } from '@angular/core';
import { BaseService, PageData, Option, SearchParam } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { Observable, of } from 'rxjs';
import HttpClientUtil from '@/commons/utils/httpclient';
import { UserData } from '../components/user-info/user-info.component';

@Injectable()
export class UserService extends BaseService<UserData> {

  private userData: Array<UserData>;

  constructor(@Inject(HttpClientUtil) httpClient: HttpClientUtil) {
    super(httpClient);
  }

  protected prefix = () => 'system/user';

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
      value: 1,
      title: '文盲',
    }, {
      value: 2,
      title: '小学',
    }, {
      value: 3,
      title: '初中',
    }, {
      value: 4,
      title: '高中',
    }, {
      value: 5,
      title: '本科',
    }, {
      value: 6,
      title: '硕士',
    }, {
      value: 7,
      title: '博士',
    }]);
  }
}
