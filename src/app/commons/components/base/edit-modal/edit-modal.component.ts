import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataItem, InputType, Column } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  data: object;
  @Input() columns: Array<Column>;
  @Input() onSubmit: (params) => any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() visible: boolean;

  @Input() set editData(value: object) {
    this.data = value;
    this.refreshFormFields();
  }
  get editData() {
    return this.data;
  }

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.refreshFormFields();
  }

  private refreshFormFields() {
    const controlsConfig = {};
    this.columns.forEach(col => {
      let validators = [];
      controlsConfig[col.dataIndex] = [this.editData[col.dataIndex], validators];
    });
    this.validateForm = this.fb.group(controlsConfig);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  reset() {
  }

  private changeVisible() {
    this.visibleChange.emit(false);
  }

  private collect() {
    const controls = this.validateForm.controls;
    _.keys(controls).forEach(key => this.data[key] = controls[key].value);
  }

  handleSave() {
    this.collect();
    this.changeVisible();
    const data = this.data;
    this.columns.filter(v => v.type === InputType.SWITCH)
      .map(v => v.dataIndex)
      .forEach(key => data[key] = data[key] ? 1 : 0);
    this.columns.filter(v => v.type === InputType.SELECT)
      .map(v => v.dataIndex)
      .forEach(key => (data[key] === -1) && (delete data[key]));
    this.onSubmit(data);
  }

  handleCancel() {
    this.visibleChange.emit(false)
  }
}
