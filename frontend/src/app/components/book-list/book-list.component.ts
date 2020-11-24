import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/services/book-api.service';
import { AuthorApiService } from 'src/app/services/author-api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  dataSource = null;
  authors = null;
  tableColumns  :  string[] = ['bookTitle', 'bookMainAuthor', 'bookSecondaryAuthors', 'bookPrice', 'actions'];

  constructor(
    private bookApiService: BookApiService,
    private authorApiService: AuthorApiService,
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getAuthors();
  }

  getBooks(): void {
    this.bookApiService.getBooks().toPromise().then(
      (data) => {
        this.dataSource = data["hydra:member"];
      })
  }

  getAuthors(): void {
    this.authorApiService.getAuthors().toPromise().then(
      (data) => {

        let reducer = (acc: Object, current: Object): Object => {
          acc[current['@id']] = current; 
          return acc
        }

        this.authors = data["hydra:member"].reduce(reducer, {});
      })
  }

  deleteBook(bookId: string):void {
    this.bookApiService.deleteBook(bookId).toPromise().then(() => {
      this.getBooks();
    })
  }
}
