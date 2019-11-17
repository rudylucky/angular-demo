import { Component, OnInit, Input } from '@angular/core';
import { Column, DataItem, PageData, SearchParam, InputType } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

enum ModalType {
  EDIT, SAVE
}

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {

  @Input() tableData: Array<DataItem> = [];

  @Input() update: (params) => Observable<any>;
  @Input() delete: (params) => Observable<any>;
  @Input() search: (params: SearchParam) => Observable<PageData<any>>;
  @Input() list: (params) => Array<any>;
  @Input() info: (params) => Observable<any>;
  @Input() save: (params) => Observable<any>;

  @Input() set columns(value: Array<Column>) {
    this.cols = value;
  }
  get columns() {
    return this.cols;
  }

  cols: Array<Column> = [];
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
  modalType: ModalType;

  constructor(private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit(): void {
    this.handleSearch();
    this.searchColumns = this.columns.filter(v => v.searchable);
    this.searchData = {};
  }

  modalVisibleChange = (visible) => this.modalVisible = visible;

  currentPageDataChange = ($event: DataItem[]): void => this.refreshStatus();

  checkAll = (value: boolean): void => {
    this.tableData.forEach(v => this.checkedList[v.id] = value);
    this.refreshStatus();
  }

  handleSearch = () => {
    this.search({
      pageSize: this.pageSize,
      currentPage: this.pageIndex,
      ...this.searchData
    }).subscribe(pageData => {
      this.total = pageData.total;
      this.tableData = pageData.records;
      this.loading = false;
    });
  }

  preEdit = (data: DataItem) => {
    this.modalVisible = true;
    this.modalType = ModalType.EDIT;
    this.info(data.code).subscribe(resp => this.editData = resp);
  }

  renderCell(column: Column, data) {
    const value = data[column.dataIndex];
    if (column.options && column.options.length) {
      const option = column.options.find(v => v.value === value);
      return _.isNull(option) ? '-' : option.title;
    }
    return _.isNull(value) ? '-' : value;
  }

  preSave = () => {
    this.modalVisible = true;
    this.modalType = ModalType.SAVE;
    this.editData = {};
  }

  handleModalSubmit = async (param) => {
    let result;
    if (this.modalType === ModalType.EDIT) {
      result = await this.update(param);
      if (result) {
        this.message.create('info', '更新成功');
      } else {
        this.message.create('warn', '更新失败');
      }
    } else if (this.modalType === ModalType.SAVE) {
      result = await this.save(this.editData);
      if (result) {
        this.message.create('info', '保存成功');
      } else {
        this.message.create('warn', '保存失败');
      }
    } else {
      throw new Error('modal type error');
    }
    this.handleSearch();
    return result;
  }

  handleDelete = async (data) => {
    const deleteData = this.tableData.find(v => data.id === v.id);
    const result = await this.delete(deleteData.id);
    if (result) {
      this.message.create('info', '删除成功');
    }
    this.handleSearch();
  }

  handleCheckChange = (): void => this.refreshStatus();

  refreshStatus = (): void => {
    this.isAllChecked = this.tableData.every(v => this.checkedList[v.id] === true);
    this.isIndeterminate = !this.isAllChecked && this.tableData.some(v => this.checkedList[v.id] === true);
  }

}
