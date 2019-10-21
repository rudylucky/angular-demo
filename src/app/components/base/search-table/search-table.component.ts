import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from '@/services/user.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  allData: UserInfo[] = [];
  checkedList: {[key: string]: boolean} = {};
  numberOfChecked = 0;

  isAllChecked = false;
  isIndeterminate = false;

  loading = true;
  pageIndex = 1;
  pageSize = 80;
  total = 1;

  constructor(private userService: UserService) { }

  currentPageDataChange($event: UserInfo[]): void {
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    this.allData.forEach(v => this.checkedList[v.key] = value);
    this.refreshStatus();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.allData = this.userService.getUsers(this.pageSize, this.pageIndex).records;
    this.loading = false;
    this.total = 200;
  }

  handleCheckChange(): void {
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllChecked = this.allData.every(v => this.checkedList[v.key] === true);
    this.isIndeterminate = !this.isAllChecked && this.allData.some(v => this.checkedList[v.key] === true);
  }

  ngOnInit(): void {
    this.searchData();
  }
}
