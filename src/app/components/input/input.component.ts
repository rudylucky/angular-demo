import { Component, OnInit, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }],
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() type;
  @Input() options;
  @Input() name;
  value: any;

  onChange = (value: any) => {};

  writeValue(obj: any): void {
    console.log('writeValue: ' + this.name, obj);
    if (obj == null) {
      return;
    }
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange: ' + this.name);
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched: ' + this.name);
    fn(this.value);
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState: ' + this.name, isDisabled);
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
