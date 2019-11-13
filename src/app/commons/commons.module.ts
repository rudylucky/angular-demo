import { NgModule } from '@angular/core';
import { SearchTableComponent } from './components/base/search-table/search-table.component';
import { EditModalComponent } from './components/base/edit-modal/edit-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from './components/input/input.component';
import { AppRoutingModule } from '@/app-routing.module';
import { IconsProviderModule } from '@/icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
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
    BrowserAnimationsModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SearchTableComponent,
    InputComponent,
    EditModalComponent,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CommonsModule { }
