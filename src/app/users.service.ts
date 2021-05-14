import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'https://api.github.com/users/gaearon/followers?per_page=100';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }
}
