import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookApiService } from 'src/app/services/book-api.service';
import { AuthorApiService } from 'src/app/services/author-api.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  book = {
    mainAuthor: '',
    authors: [],
    id: '',
    title: '',
    category: '',
    price: '',
  };

  form_authors = [];
  form_price = '';
  form_title = '';
  form_category = '';
  form_author = '';

  authors = null;
  main_author = '';
  book_authors = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookApiService: BookApiService,
    private authorApiService: AuthorApiService,
  ) {
  }

  ngOnInit(): void {
    this.getAuthors();
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.bookApiService.getBook(params.get('id')).toPromise().then((data: any) => {
          this.book = data;
          this.main_author = this.book.mainAuthor;
          this.book_authors = this.book.authors;

          console.log(data);
          console.log(this.main_author);
          console.log(this.book_authors)
        }).catch((reason) => {console.log(reason)});
      }
    });
  }

  getAuthors(): void {
    this.authorApiService.getAuthors().toPromise().then(
      (data) => {
        this.authors = data["hydra:member"];
        console.log(this.authors);
      })
  }

  handleForm(): void {
    console.log(this.form_authors);
    console.log(this.form_price);
    console.log(this.form_title);
    console.log(this.form_category);
    console.log(this.form_author);
  }
}
