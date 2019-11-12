import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';

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

export default class HttpClientUtils {

  private httpClient: HttpClient;

  constructor(@Inject(HttpClient) httpClient) {
    this.httpClient = httpClient;
  }

  get(url: string, params?: object) {
    this.httpClient.get(url, this.wrap(params));
  }

  post(url: string, params: object) {
    this.httpClient.get(url, this.wrap(params));
  }

  delete(url: string, params: object) {
    this.httpClient.delete(url, this.wrap(params));
  }

  put(url: string, params: object) {
    this.httpClient.put(url, this.wrap(params));
  }

  private wrap(params: object): HttpOption {
    return {};
  }

}
