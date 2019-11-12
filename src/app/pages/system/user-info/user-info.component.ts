import { Component, OnInit } from '@angular/core';
import { UserService } from '@/services/user.service';
import { Column, InputType } from '@/services/service-interface';
import _ from '@/commons/utils';
import consts from '@/commons/constants';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  search = this.userService.search;
  list = this.userService.list;
  info = this.userService.info;

  columns: Array<Column> = [
    {
      title: '姓名',
      dataIndex: 'username',
      searchable: true,
      required: true,
    },
    {
      title: '姓别',
      dataIndex: 'gender',
      type: InputType.SELECT,
      options: this.userService.listGenderType(),
      searchable: true,
      required: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      type: InputType.NUMBER,
      required: true
    },
    {
      title: '学历',
      dataIndex: 'degree',
      type: InputType.SELECT,
      options: this.userService.listDegreeType()
    },
    {
      title: '户籍',
      dataIndex: 'censusRegister',
    },
    {
      title: '转正状态',
      dataIndex: 'regular',
      type: InputType.SWITCH,
      options: consts.BooleanType,
    },
    {
      title: '在职状态',
      dataIndex: 'inPosition',
      type: InputType.SWITCH,
      options: consts.BooleanType,
    }
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  save = (data) => {
    console.log('save', data);
  }

  update = (data) => {
    console.log('update', data);
  }

  delete = (data) => {
    console.log('delete', data);
  }

}
