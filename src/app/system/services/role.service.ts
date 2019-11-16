import { Injectable, Inject } from '@angular/core';
import { BaseService, DataItem } from '@/commons/interfaces/service-interface';
import HttpClientUtil from '@/commons/utils/httpclient';

@Injectable()
export class RoleService extends BaseService<RoleData> {
  constructor(@Inject(HttpClientUtil) httpClient) {
    super(httpClient);
  }

  protected prefix = () => {
    return 'system/role';
  }

}

export interface RoleData extends DataItem {
  roleName: string;
}
