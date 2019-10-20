import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

export interface ItemData {
  name: string;
  key: string;
  gender: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): ItemData[] {
    return Array(200).fill({}).map((item, index) => ({
      name: 'name' + index,
      key: 'key' + index,
      gender: 'gender' + index,
      email: 'email' + index
    }));
  }

}
