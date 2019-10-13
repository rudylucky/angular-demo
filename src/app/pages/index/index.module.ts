import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [IndexRoutingModule],
  exports: [IndexComponent]
})
export class IndexModule { }
