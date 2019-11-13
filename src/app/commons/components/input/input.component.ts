import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type;
  @Input() options;
  @Input() name;
  @Input() value;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onChange = (value: any) => { };

  constructor() { }

  ngOnInit() {
  }

}
