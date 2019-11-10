import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { IconsProviderModule } from '@/icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { IndexComponent } from '@/pages/index/index.component';
import { WelcomeComponent } from '@/pages/welcome/welcome.component';
import { MySiderComponent } from '@/components/layout/my-sider/my-sider.component';
import { UserInfoComponent } from '@/pages/system/user-info/user-info.component';
import { SearchTableComponent } from '@/components/base/search-table/search-table.component';
import { InputComponent } from './components/input/input.component';
import { EditModalComponent } from './components/base/edit-modal/edit-modal.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    WelcomeComponent,
    MySiderComponent,
    UserInfoComponent,
    SearchTableComponent,
    InputComponent,
    EditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
