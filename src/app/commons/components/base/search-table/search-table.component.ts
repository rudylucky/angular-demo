import { Component, OnInit, Input } from '@angular/core';
import { Column, DataItem, PageData, SearchParam, InputType, Option } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { debounceTime } from 'rxjs/operators';

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
  scrollY: string;

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
    this.computeScrollY();
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
    if (column.multiple) {
      return this.renderMultiSelect(column, value);
    }
    if (column.options) {
      return this.renderSelect(column, value);
    }
    return _.isNull(value) ? '-' : value;
  }

  private renderMultiSelect = (column: Column, value: Array<string | number | boolean>): string => {
    if (_.isNull(value)) {
      return '-';
    }
    return column.options.filter(v => value.includes(v.value)).map(v => v.title).join(', ');
  }

  private renderSelect = (column: Column, value): string => {
    const option = column.options.find(v => v.value === value);
    return _.isNull(option) ? '-' : option.title;
  }

  preSave = () => {
    this.modalVisible = true;
    this.modalType = ModalType.SAVE;
    this.editData = {};
  }

  handleModalSubmit = (param) => {
    let result: Observable<boolean>;
    if (this.modalType === ModalType.EDIT) {
      result = this.update(param);
    } else if (this.modalType === ModalType.SAVE) {
      result = this.save(this.editData);
    } else {
      throw new Error('modal type error');
    }
    result.subscribe(resp => {
      if (resp) {
        this.modalVisibleChange(false);
        this.message.create('info', '保存成功');
      } else {
        this.message.create('warn', '保存失败');
      }
      this.handleSearch();
    });
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

  computeScrollY = () => {
    const container = document.querySelector('.container-search-table')
    const resizeEventListener = () => {
      const height = container.clientHeight - 265;
      if (height < 200) {
        this.scrollY = 200 + 'px';
      } else {
        this.scrollY = height + 'px';
      }
    };
    fromEvent(container, 'resize').subscribe(resizeEventListener);

    setTimeout(resizeEventListener, 500);
  }

}
