import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  dataSource = null;
  tableColumns  :  string[] = ['bookTitle', 'bookMainAuthor', 'bookPrice', 'actions'];

  constructor(private bookApiService: BookApiService) {}

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks(): void {
    this.bookApiService.getBooks().toPromise().then(
      (data) => {
        this.dataSource = data["hydra:member"];
        console.log(this.dataSource);
      })
  }

  deleteBook(bookId: string):void {
    this.bookApiService.deleteBook(bookId).toPromise().then(() => {
      this.getBooks();
    })
  }
}
