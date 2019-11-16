import { Injectable } from '@angular/core';

export interface Page {
  code: string;
  name: string;
  icon: string;
  path: string;
}

export interface Menu {
  name: string;
  code: string;
  icon: string;
  pages: Page[];
}

@Injectable({
  providedIn: 'root'
})
export default class MenuService {

  constructor() { }

  getMenus(): Menu[] {
    return [
      {
        name: '系统',
        code: 'system',
        icon: 'setting',
        pages: [
          {
            name: '用户设置',
            code: 'system',
            icon: 'setting',
            path: '/user-info'
          },
          {
            name: '角色设置',
            code: 'system',
            icon: 'setting',
            path: '/role-info'
          },
          {
            name: '部门设置',
            code: 'system',
            icon: 'setting',
            path: '/department'
          },
        ]
      }, {
        name: '基础',
        code: 'basedata',
        icon: 'database',
        pages: [
          {
            name: '基础页面',
            code: 'basedata',
            icon: 'database',
            path: '/basedata'
          },
        ]
      }, {
        name: '生产',
        code: 'product',
        icon: 'tool',
        pages: [
          {
            name: '生产页面',
            code: 'product',
            icon: 'tool',
            path: '/product'
          },
        ]
      }, {
        name: '质量',
        code: 'quality',
        icon: 'safety-certificate',
        pages: [
          {
            name: '质量页面',
            code: 'quality',
            icon: 'safety-certificate',
            path: '/quality'
          },
        ]
      }
    ];
  }
}
