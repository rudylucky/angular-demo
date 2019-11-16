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

  @Input() columns: Array<Column> = [];
  @Input() tableData: Array<DataItem> = [];

  @Input() update: (params) => Promise<any>;
  @Input() delete: (params) => Promise<any>;
  @Input() search: (params: SearchParam) => Promise<PageData<any>>;
  @Input() list: (params) => Array<any>;
  @Input() info: (params) => Promise<any>;
  @Input() save: (params) => Promise<any>;

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
  modalType: ModalType;

  constructor(private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit(): void {
    this.handleSearch();
    this.searchColumns = this.columns.filter(v => v.searchable);
    this.searchData = {};
  }

  modalVisibleChange = (visible) => {
    this.modalVisible = visible;
  }

  currentPageDataChange = ($event: DataItem[]): void => {
    this.refreshStatus();
  }

  checkAll = (value: boolean): void => {
    this.tableData.forEach(v => this.checkedList[v.id] = value);
    this.refreshStatus();
  }

  handleSearch = async () => {
    const pageData: PageData<DataItem> = await this.search({
      pageSize: this.pageSize,
      currentPage: this.pageIndex,
      ...this.searchData
    });
    this.total = pageData.total;
    this.tableData = pageData.records;
    this.loading = false;
    this.transferForRender();
  }

  preEdit = async (data: DataItem) => {
    this.modalVisible = true;
    this.modalType = ModalType.EDIT;
    this.editData = await this.info(data.code);
  }

  preSave = () => {
    this.modalVisible = true;
    this.modalType = ModalType.SAVE;
    this.editData = {};
  }

  handleModalSubmit = async (param) => {
    if (this.modalType === ModalType.EDIT) {
      const result = await this.update(param);
      if (result) {
        this.message.create('info', '更新成功');
      } else {
        this.message.create('warn', '更新失败');
      }
    } else if (this.modalType === ModalType.SAVE) {
      const result = await this.save(this.editData);
      if (result) {
        this.message.create('info', '保存成功');
      } else {
        this.message.create('warn', '保存失败');
      }
    } else {
      throw new Error('modal type error');
    }
    this.handleSearch();
  }

  private transferForRender = () => {
    this.renderedData = _.clone(this.tableData);
    this.columns.filter(element => [InputType.SELECT, InputType.SWITCH].includes(element.type))
      .forEach(element => {
        this.renderedData.forEach(v => {
          const item = element.options.find(option => option.value === v[element.dataIndex]);
          if (_.isNull(item)) {
            return;
          }
          v[element.dataIndex] = item.title;
        });
      });
  }

  handleDelete = async (data) => {
    const deleteData = this.tableData.find(v => data.id === v.id);
    const result = await this.delete(deleteData);
    if (result) {
      this.message.create('info', '删除成功');
    }
    this.handleSearch();
  }

  handleCheckChange = (): void => {
    this.refreshStatus();
  }

  refreshStatus = (): void => {
    this.isAllChecked = this.tableData.every(v => this.checkedList[v.id] === true);
    this.isIndeterminate = !this.isAllChecked && this.tableData.some(v => this.checkedList[v.id] === true);
  }

}
