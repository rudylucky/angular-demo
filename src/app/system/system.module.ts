import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '@/system/components/user-info/user-info.component';
import { RoleInfoComponent } from '@/system/components/role-info/role-info.component';
import { SearchTableComponent } from '@/commons/components/base/search-table/search-table.component';
import { InputComponent } from '@/commons/components/input/input.component';
import { EditModalComponent } from '@/commons/components/base/edit-modal/edit-modal.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { IconsProviderModule } from '@/icons-provider.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonsModule } from '@/commons/commons.module';
import { WelcomeComponent } from '@/system/components/welcome/welcome.component';

@NgModule({
  declarations: [
    UserInfoComponent,
    RoleInfoComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class SystemModule { }
