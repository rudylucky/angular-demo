import { Component, OnInit } from '@angular/core';
import { RoleService } from '@/system/services/role.service';
import { Column } from '@/commons/interfaces/service-interface';

@Component({
  selector: 'app-role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss'],
  providers: [RoleService]
})
export class RoleInfoComponent implements OnInit {

  columns: Array<Column> = [{
      title: '角色名称',
      dataIndex: 'roleName',
      searchable: true,
      required: true,
  }];

  constructor(protected roleService: RoleService) { }

  ngOnInit() {
  }

}
