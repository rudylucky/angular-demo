import { Component, OnInit } from '@angular/core';
import { Column, InputType, DataItem, Option } from '@/commons/interfaces/service-interface';
import consts from '@/commons/utils/constants';
import { UserService } from '@/system/services/user.service';
import { RoleService, RoleData } from '@/system/services/role.service';
import _ from '@/commons/utils/utils';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserService, RoleService]
})
export class UserInfoComponent implements OnInit {

  search = this.userService.search;
  list = this.userService.list;
  info = this.userService.info;

  columns: Array<Column> = [];

  constructor(private userService: UserService, private roleService: RoleService) {
  }

  ngOnInit() {
    this.columns = [
      { title: '姓名', dataIndex: 'username', searchable: true, required: true, },
      {
        title: '角色', dataIndex: 'roles', required: true,
        type: InputType.SELECT, options: [], multiple: true
      },
      { title: '姓别', dataIndex: 'gender', type: InputType.RADIO, options: this.listGenderType(), searchable: true, required: true, },
      { title: '邮箱', dataIndex: 'email', },
      { title: '年龄', dataIndex: 'age', type: InputType.NUMBER, required: true, },
      { title: '学历', dataIndex: 'degree', type: InputType.SELECT, options: this.listDegreeType(), },
      { title: '户籍', dataIndex: 'census', },
      { title: '转正状态', dataIndex: 'positiveStatus', type: InputType.SWITCH, options: consts.BooleanType, },
      { title: '在职状态', dataIndex: 'positionStatus', type: InputType.SWITCH, options: consts.BooleanType, }
    ];
    this.initOptions();
  }

  initOptions = async () => {
    this.listRoles();
  }

  listRoles = () => {
    const mapOption = (roles: Array<RoleData>) => roles.map(v => ({ value: v.code, title: v.roleName }));
    return this.roleService.list().pipe(map(mapOption)).subscribe(roles => {
      this.columns.find(c => c.dataIndex === 'roles').options = roles;
    });
  }

  listGenderType = () => {
    let result;
    this.userService.listGenderType().subscribe(v => result = v);
    return result;
  }

  listDegreeType = () => {
    let result;
    this.userService.listDegreeType().subscribe(v => {
      result = v;
    });
    return result;
  }

  save = (data) => this.userService.save(data);

  update = (data) => this.userService.update(data);

  delete = (data) => this.userService.delete(data);

}

export interface UserData extends DataItem {
  username: string;
  gender: number;
  email: string;
  age: number;
  censusRegister: string;
  degree: number;
  inPosition: number;
  regular: number;
}
