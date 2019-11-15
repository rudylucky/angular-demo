import { Component, OnInit, Input } from '@angular/core';
import { Column, DataItem, PageData, SearchParam, InputType, UserData } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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

  @Input() update: (params) => any;
  @Input() delete: (params) => any;
  @Input() search: (params: SearchParam) => Promise<PageData<any>>;
  @Input() list: (params) => Array<any>;
  @Input() info: (params) => any;
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
  modalType: ModalType;

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

  searchAndRefresh = async () => {
    let pageData: PageData<DataItem> = await this.search({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    })
    console.log('pageData', pageData);
    this.total = pageData.total;
    this.tableData = pageData.records;
    this.loading = false;
    this.transferForRender();
  }

  preEdit = (data: UserData) => {
    this.modalVisible = true;
    this.modalType = ModalType.EDIT
    this.editData = this.info(data.id);
  }

  preSave() {
    this.modalVisible = true;
    this.modalType = ModalType.SAVE;
    this.editData = {};
  }

  handleModalSubmit() {
    if (this.modalType === ModalType.EDIT) {
      this.update(this.editData);
    } else if (this.modalType === ModalType.SAVE) {
      this.save(this.editData);
    } else {
      throw new Error('modal type error');
    }
  }

  private transferForRender = () => {
    console.log(this.tableData);
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
