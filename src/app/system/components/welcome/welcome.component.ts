import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzFormatBeforeDropEvent } from 'ng-zorro-antd';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  template: ` <nz-tree [nzData]="nodes" nzDraggable nzBlockNode [nzBeforeDrop]="beforeDrop"> </nz-tree> `,
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  nodes = [
    {
      title: '0-0',
      key: '100',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '1001',
          children: [{ title: '0-0-0-0', key: '10010', isLeaf: true }, { title: '0-0-0-1', key: '10011', isLeaf: true }]
        },
        {
          title: '0-0-1',
          key: '1002',
          children: [{ title: '0-0-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  public ngOnInit() {

  }

  beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
    // if insert node into another node, wait 1s
    if (arg.pos === 0) {
      return of(true).pipe(delay(1000));
    } else {
      return of(false);
    }
  }


}
