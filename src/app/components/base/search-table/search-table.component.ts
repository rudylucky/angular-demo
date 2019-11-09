import { Component, OnInit, Input } from '@angular/core';
import { Column, DataItem, PageData, SearchParams, ListParams, InputType, UserData } from '@/services/service-interface';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {

  @Input() columns: Array<Column> = [];
  @Input() tableData: Array<DataItem> = [];

  @Input() update: (params) => any;
  @Input() delete: (params) => any;
  @Input() search: (params: SearchParams) => PageData<any>;
  @Input() list: (params: ListParams) => Array<any>;
  @Input() info: (params: number) => any;

  renderedData = [];
  checkedList: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  isAllChecked = false;
  isIndeterminate = false;

  loading = true;
  pageIndex = 1;
  pageSize = 80;
  total = 1;

  editData = {};

  modalVisible = false;

  constructor() { }

  currentPageDataChange = ($event: DataItem[]): void => {
    this.refreshStatus();
  }

  checkAll = (value: boolean): void => {
    this.tableData.forEach(v => this.checkedList[v.id] = value);
    this.refreshStatus();
  }

  searchAndRefresh = () => {
    const pageData = this.search({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    });
    this.total = pageData.total;
    this.tableData = pageData.records;
    this.loading = false;
    this.transfer();
  }

  edit = (data: UserData) => {
    this.editData = this.info(data.id);
    this.modalVisible = true;
  }

  transfer = () => {
    this.renderedData = this.tableData;
    this.columns.filter(element => element.type === InputType.SELECT)
      .forEach(element => {
        this.renderedData.forEach(v => {
          v[element.dataIndex] = element.options.find(option => option.value === v[element.dataIndex]).title;
        });
      });
  }

  handleUpdate() {
    this.modalVisible = false;
    this.update(this.editData);
  }

  handleCheckChange = (): void => {
    this.refreshStatus();
  }

  refreshStatus = (): void => {
    this.isAllChecked = this.tableData.every(v => this.checkedList[v.id] === true);
    this.isIndeterminate = !this.isAllChecked && this.tableData.some(v => this.checkedList[v.id] === true);
  }

  ngOnInit(): void {
    this.searchAndRefresh();
  }
}
