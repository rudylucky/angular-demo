import { NgModule } from '@angular/core';
import { CommonsModule } from '@/commons/commons.module';
import { TalkComponent } from './talk/talk.component';



@NgModule({
  declarations: [
    TalkComponent
  ],
  imports: [
    CommonsModule
  ]
})
export class ImModule { }
