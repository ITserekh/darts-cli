import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsMessagesService {

  constructor(private http: HttpClient) { }

  getValidatorsMessages(url: string) {
    return this.http.get(url);
  }
}
