import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HOSTNAME, PORT } from '@/commons/config/config';
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

  constructor(private httpClient: HttpClient, private message: NzMessageService) {
  }

  private assembleUrl(url: string) {
    return `http://${HOSTNAME}:${PORT}/${url}`;
  }

  get = (url: string, param?: object): Observable<any> => {
    const qs = _.queryString(param);
    const fullUrl = this.assembleUrl(url);
    return this.httpClient.get(`${fullUrl}?${qs}`).pipe(catchError(this.checkError), map(this.extractData));
  }

  post = (url: string, params?: object): Observable<any> => {
    return this.httpClient.post(this.assembleUrl(url), params, this.wrap(params)).pipe(catchError(this.checkError), map(this.extractData));
  }

  delete = (url: string, params: object): Observable<any> => {
    const fullUrl = this.assembleUrl(url);
    const qs = _.queryString(params);
    return this.httpClient.delete(`${fullUrl}?${qs}`, this.wrap(params)).pipe(catchError(this.checkError), map(this.extractData));
  }

  put = (url: string, params: object): Observable<any> => {
    return this.httpClient.put(this.assembleUrl(url), this.wrap(params)).pipe(catchError(this.checkError), map(this.extractData));
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

  private extractData = (response: Response) => {
    return response.data;
  }

  private checkError = (response: Response): any => {
    if (response.status) {
      this.message.create('error', response.errorMessage);
      throw new Error(response.errorMessage);
    }
  }

}
