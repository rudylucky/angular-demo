import { Component, OnInit } from '@angular/core';
import { Columns } from '@/components/base/search-table/search-table.component';
import { InputType } from '@/components/input/input.component';
import { UserInfo, UserService } from '@/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  search = this.userService.list;

  columns: Columns = [
    {
      title: '姓名',
      dataIndex: 'username',
      searchable: true
    },
    {
      title: '姓别',
      dataIndex: 'gender',
      type: InputType.SELECT,
      options: this.userService.listGenderType(),
      searchable: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      type: InputType.NUMBER
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
    }
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  update = (data) => {
    console.log('update', data);
  }

  delete = (data) => {
    console.log('delete', data);
  }

}
