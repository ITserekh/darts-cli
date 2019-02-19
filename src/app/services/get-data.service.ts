import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class GetDataService {

  constructor(private http: HttpClient) {
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getPage(pageNumber: number): Observable<any> {
    const url = `./assets/usersPages/usersPage${pageNumber}.json`;
    return this.http.get(url);
  }
}
