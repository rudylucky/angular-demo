import { Component, OnInit, Input } from '@angular/core';

export enum InputType {
  INPUT = 0,
  SELECT = 1,
  CHECKBOX = 2,
  NUMBER = 3,
  DATE = 4,
  TIME = 5,
  DATETIME = 6,
  RADIO = 7,
  SWITCH = 8,
  UPLOAD = 9
}

export interface Option {
  value: number;
  title: string;
}

export interface Options {
  [index: number]: Option;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type;
  @Input() options;

  value = '';

  constructor() { }

  ngOnInit() {
  }

}
