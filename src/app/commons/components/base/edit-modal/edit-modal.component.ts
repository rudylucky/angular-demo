import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataItem, InputType, Column } from '@/commons/interfaces/service-interface';
import _ from '@/commons/utils/utils';
import { ObjectUnsubscribedError, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  data: object = {};
  cols = [];
  @Input() set columns(value: Array<Column>) {
    this.cols = value;
  }
  get columns() {
    return this.cols;
  }
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() visible: boolean;

  @Input() set editData(value: object) {
    this.data = value;
    !this.form && this.createForm();
    this.refreshFormFields();
  }
  get editData() {
    return this.data;
  }
  @Input() onSubmit: (params) => Observable<boolean>;

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
    this.refreshFormFields();
  }

  private refreshFormFields = () => {
    this.form.patchValue(this.editData);
  }

  validate = (): void => {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  private changeVisible = () => this.visibleChange.emit(false);

  handleSubmit = () => {
    console.log(this.form.value);
    false && this.onSubmit(this.form.value).subscribe(resp => {
      this.form.reset();
      (resp === true) && this.changeVisible();
    });
  }

  handleCancel = () => this.visibleChange.emit(false);
}
