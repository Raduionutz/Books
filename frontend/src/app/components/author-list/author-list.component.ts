import { Component, OnInit } from '@angular/core';
import { AuthorApiService } from 'src/app/services/author-api.service';
import { BookApiService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  dataSource = null;
  books = null;
  tableColumns  :  string[] = ['authorName', 'books', 'secondaryBooks', 'actions'];

  constructor(
    private bookApiService: BookApiService,
    private authorApiService: AuthorApiService,
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorApiService.getAuthors().toPromise().then(
      (data) => {
        this.dataSource = data["hydra:member"];
      });
  }

  getBooks(): void {
    this.bookApiService.getBooks().toPromise().then(
      (data) => {
        let reducer = (acc: Object, current: Object): Object => {
          acc[current['@id']] = current; 
          return acc;
        };

        this.books = data["hydra:member"].reduce(reducer, {});
      });
  }

  deleteAuthor(authorId: string):void {
    this.authorApiService.deleteAuthor(authorId).toPromise().then(() => {
      this.getAuthors();
      this.getBooks();
    });
  }
}
