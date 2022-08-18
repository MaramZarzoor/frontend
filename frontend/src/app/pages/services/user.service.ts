import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIS} from "../config/apis";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number) {
    return this.http.get(APIS.getUserById + '/' + id);
  }

  getUsers() {
    return this.http.get(APIS.getUsers);
  }
}
