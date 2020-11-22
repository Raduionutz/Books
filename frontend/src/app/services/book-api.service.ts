import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Object> {
    return this.http.get('https://localhost:8443/books');
  }
}
