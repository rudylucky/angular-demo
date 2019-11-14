import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  private httpClient: HttpClient;

  constructor(@Inject(HttpClient) httpClient) {
    this.httpClient = httpClient;
  }

  get(url: string, params?: object): Observable<any> {
    return this.httpClient.get(url, this.wrap(params));
  }

  post(url: string, params?: object): Observable<any> {
    return this.httpClient.get(url, this.wrap(params));
  }

  delete(url: string, params: object): Observable<any> {
    return this.httpClient.delete(url, this.wrap(params));
  }

  put(url: string, params: object): Observable<any> {
    return this.httpClient.put(url, this.wrap(params));
  }

  private wrap(params: object): HttpOption {
    return {};
  }

}
