import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HOSTNAME, PORT } from "@/commons/config/config";
import _ from './utils';
import { NzMessageService } from 'ng-zorro-antd';

interface HttpOption {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface Response {
  status: number;
  errorCode: number;
  errorMessage: string;
  data: object | [];
}

@Injectable({ providedIn: 'root' })
export default class HttpClientUtil {

  constructor(private httpClient: HttpClient, private messageService: NzMessageService) {
  }

  private assembleUrl(url: string) {
    return `http://${HOSTNAME}:${PORT}/${url}`;
  }

  get = (url: string, param?: object): Promise<any> => {
    const qs = _.queryString(param);
    const fullUrl = this.assembleUrl(url);
    return this.httpClient.get(`${fullUrl}?${qs}`).toPromise().then(this.checkError);
  }

  post = (url: string, params?: object): Promise<any> => {
    return this.httpClient.post(this.assembleUrl(url), params, this.wrap(params)).toPromise().then(this.checkError);
  }

  delete = (url: string, params: object): Promise<any> => {
    const fullUrl = this.assembleUrl(url);
    const qs = _.queryString(params);
    return this.httpClient.delete(`${fullUrl}?${qs}`, this.wrap(params)).toPromise().then(this.checkError);
  }

  put = (url: string, params: object): Promise<any> => {
    return this.httpClient.put(this.assembleUrl(url), this.wrap(params)).toPromise().then(this.checkError);
  }

  private wrap = (param: object): HttpOption => {
    const headers = new HttpHeaders({
      Authorization: 'my-auth-token'
    });
    const params = new HttpParams(param);
    if (param instanceof String) {
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    return {
      headers,
      params
    };
  }

  private checkError = (response: Response): any => {
    if (response.status) {
      this.messageService.create('error', response.errorMessage);
      throw new Error(response.errorMessage);
    }
    return response.data;
  }

}
