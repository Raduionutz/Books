import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorApiService {
  
  authors = null;

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Object> {
    return this.http.get('https://localhost:8443/authors');
  }

  getAuthor(authorId: string): Observable<Object> {
    return this.http.get(`https://localhost:8443/authors/${authorId}`);
  }

  deleteAuthor(authorId: string): Observable<Object> {
    return this.http.delete(`https://localhost:8443${authorId}`);
  }

  putAuthor(authorId: string, authorBody: object): Observable<Object> {
    return this.http.put(`https://localhost:8443/authors/${authorId}`, authorBody);
  }

  postAuthor(authorBody: object): Observable<Object> {
    return this.http.post(`https://localhost:8443/authors`, authorBody);
  }
}
