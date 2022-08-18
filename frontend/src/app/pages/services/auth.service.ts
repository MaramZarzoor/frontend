import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {APIS} from "../config/apis";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<any> {
    return this.http.post(APIS.login, payload);
  }
  signUp(payload: any): Observable<any> {
    return this.http.post(APIS.signUp, payload);
  }
}
