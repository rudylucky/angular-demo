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

  data: object = {};
  @Input() columns: Array<Column>;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() visible: boolean;

  @Input() set editData(value: object) {
    this.data = value;
    this.refreshFormFields();
  }
  get editData() {
    return this.data;
  }
  @Input() onSubmit: (params) => any;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.refreshFormFields();
  }

  private refreshFormFields = () => {
    const controlsConfig = {};
    this.columns.forEach(col => {
      const validators = [];
      if (col.required) {
        validators.push(Validators.required);
      }
      controlsConfig[col.dataIndex] = [this.data[col.dataIndex], validators];
    });
    this.validateForm = this.fb.group(controlsConfig);
  }

  submitForm = (): void => {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  private changeVisible() {
    this.visibleChange.emit(false);
  }

  handleSubmit = () => {
    this.changeVisible();
    this.submitForm();
    const controls = this.validateForm.controls;
    _.keys(controls).forEach(key => this.data[key] = controls[key].value);
    this.onSubmit(this.data);
  }

  handleCancel = () => {
    this.visibleChange.emit(false);
  }
}
