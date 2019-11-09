import { Component, OnInit, Input, ɵLocaleDataIndex } from '@angular/core';
import { InputType, Options } from '@/components/input/input.component';
import { PageData } from '@/services/user.service';

export interface Columns {
  [index: number]: {
    title: string;
    dataIndex?: string;
    type?: InputType;
    options?: Options;
    searchable?: boolean
    render?: (value) => any;
  };
}

export interface DataItem {
  key: string;
}

export interface TableData {
  [index: number]: DataItem;
}

interface Params {
  pageSize: number;
  pageIndex: number;
}

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {

  @Input() columns: Columns = [];
  @Input() tableData: Array<DataItem> = [];

  @Input() update: (record) => any;
  @Input() delete: (record) => any;
  @Input() search: (record: Params) => PageData<any>;

  checkedList: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  isAllChecked = false;
  isIndeterminate = false;

  loading = true;
  pageIndex = 1;
  pageSize = 80;
  total = 1;

  modalVisible = false;

  constructor() { }

  currentPageDataChange($event: DataItem[]): void {
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    this.tableData.forEach(v => this.checkedList[v.key] = value);
    this.refreshStatus();
  }

  searchAndRefresh() {
    const pageData = this.search({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    });
    this.total = pageData.total;
    this.tableData = pageData.records;
    this.loading = false;
  }


  handleCheckChange(): void {
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllChecked = this.tableData.every(v => this.checkedList[v.key] === true);
    this.isIndeterminate = !this.isAllChecked && this.tableData.some(v => this.checkedList[v.key] === true);
  }

  ngOnInit(): void {
    this.searchAndRefresh();
  }
}
