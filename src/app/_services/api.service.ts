import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl: string = '';

  constructor(private http: HttpClient) { }

  _getUserList(req: any) {
    return this.http.post(`${this.apiUrl}/users`, req);
  }
}
