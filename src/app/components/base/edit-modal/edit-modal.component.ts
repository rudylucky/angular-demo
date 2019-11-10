import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataItem, InputType, Column } from '@/services/service-interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  modalVisible: boolean;
  editData = {};
  @Input() columns: Array<Column>;
  @Input() save: (params) => any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public get visible(): boolean {
    return this.modalVisible;
  }

  public set visible(value: boolean) {
    this.modalVisible = value;
    this.visibleChange.emit(value);
  }

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      age: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  handleSave() {
    this.modalVisible = false;
    const data = this.editData;
    this.columns.filter(v => v.type === InputType.SWITCH)
      .map(v => v.dataIndex)
      .forEach(key => data[key] = data[key] ? 1 : 0);
    this.columns.filter(v => v.type === InputType.SELECT)
      .map(v => v.dataIndex)
      .forEach(key => data[key] === -1 && delete data[key]);
    this.save(data);
  }
}
