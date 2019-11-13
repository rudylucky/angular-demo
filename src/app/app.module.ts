import { NgModule } from '@angular/core';
import { AppComponent } from '@/app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IndexComponent } from '@/system/components/index/index.component';
import { SystemModule } from '@/system/system.module';
import { CommonsModule } from './commons/commons.module';
import { MySiderComponent } from './commons/components/layout/my-sider/my-sider.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MySiderComponent
  ],
  imports: [
    SystemModule,
    CommonsModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class AppModule { }
