import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() type;
  @Input() options;
  value: any;

  writeValue(obj: any): void {
    console.log('writeValue');
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    fn(this.value);
  }
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    fn(this.value);
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
