import { Component, OnInit } from '@angular/core';
import { ItemData, UserService } from '@/services/user.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  allData: ItemData[] = [];
  checkedList: {[key: string]: boolean} = {};
  numberOfChecked = 0;

  isAllChecked = false;
  isIndeterminate = false;

  loading = true;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchGenderList: string[] = [];

  constructor(private userService: UserService) { }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  currentPageDataChange($event: ItemData[]): void {
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
    this.allData = this.userService.getUsers();
    this.loading = false;
    this.total = 200;
  }

  handleCheckChange(): void {
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllChecked = this.allData.every(v => Object.keys(this.checkedList).includes(v.key));
    this.isIndeterminate = !this.isAllChecked && this.allData.some(v => this.checkedList[v.key] === true);
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit(): void {
    this.searchData();
  }
}
