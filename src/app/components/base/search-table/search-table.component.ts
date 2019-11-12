import { Component, OnInit, Input } from '@angular/core';
import { Column, DataItem, PageData, SearchParams, ListParams, InputType, UserData } from '@/services/service-interface';
import _ from '@/commons/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { $ } from 'protractor';
import { Observable } from 'rxjs';

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
  @Input() search: (params: SearchParams) => Observable<PageData<any>>;
  @Input() list: (params: ListParams) => Array<any>;
  @Input() info: (params: number) => any;
  @Input() save: (params) => any;

  renderedData = [];
  checkedList: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  isAllChecked = false;
  isIndeterminate = false;

  loading = true;
  pageIndex = 1;
  pageSize = 10;
  total = 1;

  editData = {};
  searchData = {};
  searchColumns: Array<Column> = [];

  modalVisible = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchAndRefresh();
    this.resetSearch();
  }

  modalVisibleChange(visible) {
    this.modalVisible = visible;
  }

  currentPageDataChange = ($event: DataItem[]): void => {
    this.refreshStatus();
  }

  checkAll = (value: boolean): void => {
    this.tableData.forEach(v => this.checkedList[v.id] = value);
    this.refreshStatus();
  }

  searchAndRefresh = () => {
    let pageData: PageData<DataItem>;
    this.search({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }).subscribe(resp => {
      pageData = resp;
    });
    this.total = pageData.total;
    this.tableData = pageData.records;
    this.loading = false;
    this.transferForRender();
  }

  preEdit = (data: UserData) => {
    this.modalVisible = true;
    this.editData = this.info(data.id);
  }

  preSave() {
    this.editData = {};
    this.modalVisible = true;
  }

  handleSave = () => {
  }

  private transferForRender = () => {
    this.renderedData = _.clone(this.tableData);
    this.columns.filter(element => [InputType.SELECT, InputType.SWITCH].includes(element.type))
      .forEach(element => {
        this.renderedData.forEach(v => {
          v[element.dataIndex] = element.options.find(option => option.value === v[element.dataIndex]).title;
        });
      });
  }

  handleDelete = (data) => {
    const deleteData = this.tableData.find(v => data.id === v.id);
    this.delete(deleteData);
  }

  handleCheckChange = (): void => {
    this.refreshStatus();
  }

  refreshStatus = (): void => {
    this.isAllChecked = this.tableData.every(v => this.checkedList[v.id] === true);
    this.isIndeterminate = !this.isAllChecked && this.tableData.some(v => this.checkedList[v.id] === true);
  }

  resetSearch = (): void => {
    this.searchColumns = this.columns.filter(v => v.searchable);
    this.searchData = {};
  }

}
