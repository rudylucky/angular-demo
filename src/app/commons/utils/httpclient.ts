import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HOSTNAME, PORT } from "@/commons/config/config";

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

  constructor(private httpClient: HttpClient) {
  }

  private assembleUrl(url: string) {
    return `http://${HOSTNAME}:${PORT}/${url}`;
  }

  get(url: string, param?: string): Promise<any> {
    return this.httpClient.get(this.assembleUrl(url) + param).toPromise().then(this.checkError);
  }

  post(url: string, params?: object): Promise<any> {
    return this.httpClient.post(this.assembleUrl(url), this.wrap(params)).toPromise().then(this.checkError);
  }

  delete(url: string, params: object): Promise<any> {
    return this.httpClient.delete(this.assembleUrl(url), this.wrap(params)).toPromise();
  }

  put(url: string, params: object): Promise<any> {
    return this.httpClient.put(this.assembleUrl(url), this.wrap(params)).toPromise();
  }

  private wrap(params: object): HttpOption {
    return params;
  }

  private checkError(response: Response) {
    if (response.status) {
      throw new Error(response.errorMessage);
    }
    return response.data;
  }

}
