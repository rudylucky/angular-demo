import { Component, OnInit, Input } from '@angular/core';
import MenuService, { Menu } from '@/system/services/menu.service';

@Component({
  selector: 'app-my-sider',
  templateUrl: './my-sider.component.html',
  styleUrls: ['./my-sider.component.scss']
})
export class MySiderComponent implements OnInit {

  menus: Menu[];
  currentMenu: Menu;
  showPage = false;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    const menus = this.menuService.getMenus();
    this.menus = menus;
  }

  handleMenuOut() {
    this.showPage = false;
  }

  handleMenuEnter(menu: Menu) {
    this.currentMenu = menu;
    this.showPage = true;
  }

}
