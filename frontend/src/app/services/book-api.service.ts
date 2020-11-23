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

  getBook(bookId: string): Observable<Object> {
    return this.http.get(`https://localhost:8443/books/${bookId}`);
  }

  deleteBook(bookId: string): Observable<Object> {
    return this.http.delete(`https://localhost:8443${bookId}`);
  }

  putBook(bookId: string, bookBody: object): Observable<Object> {
    return this.http.put(`https://localhost:8443${bookId}`, bookBody);
  }

  postBook(bookBody: object): Observable<Object> {
    return this.http.put(`https://localhost:8443/books`, bookBody);
  }
}
