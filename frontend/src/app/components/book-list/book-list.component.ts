import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books = null;
  constructor(private bookApiService: BookApiService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookApiService.getBooks().toPromise().then(
      (data) => {
        console.log(data);
      })
  }

}
