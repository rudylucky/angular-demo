import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataItem, InputType, Column } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { ObjectUnsubscribedError } from 'rxjs';

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
    !this.form && this.createForm();
    this.refreshFormFields(value);
  }
  get editData() {
    return this.data;
  }
  @Input() onSubmit: (params) => any;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  private createForm() {
    const controlsConfig = this.columns.reduce((config, col) => {
      const validators = [];
      if (col.required) {
        validators.push(Validators.required);
      }
      config[col.dataIndex] = [null, validators];
      return config;
    }, {});
    this.form = this.fb.group(controlsConfig);
  }

  private refreshFormFields = (data) => {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue(data[key]);
    });
  }

  validate = (): void => {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  private changeVisible() {
    this.visibleChange.emit(false);
  }

  handleSubmit = async () => {
    const controls = this.form.controls;
    _.keys(controls).forEach(key => this.data[key] = controls[key].value);
    const result = await this.onSubmit(this.data);
    console.log(result);
    this.form.reset();
    (result === true) && this.changeVisible();
  }

  handleCancel = () => {
    this.visibleChange.emit(false);
  }
}
