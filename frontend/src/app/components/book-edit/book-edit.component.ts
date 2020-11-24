import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  mainAuthor = '';
  bookAuthors = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookApiService: BookApiService,
    private authorApiService: AuthorApiService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAuthors();
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.bookApiService.getBook(params.get('id')).toPromise().then((data: any) => {
          this.book = data;
          this.mainAuthor = this.book.mainAuthor;
          this.bookAuthors = this.book.authors;

          this.form_authors = this.book.authors;
          this.form_price = this.book.price;
          this.form_title = this.book.title;
          this.form_category = this.book.category;
          this.form_author = this.book.mainAuthor;
        })
      }
    });
  }

  getAuthors(): void {
    this.authorApiService.getAuthors().toPromise().then(
      (data) => {
        this.authors = data["hydra:member"];
      })
  }

  handleForm(): void {
    let body = {
      title: this.form_title,
      category: this.form_category,
      price: parseInt(this.form_price),
      mainAuthor: this.form_author,
      authors: this.form_authors,
    }
    let promise: Promise<any>;

    if (this.book.id) {
      promise = this.bookApiService.putBook(this.book.id, body).toPromise();
    } else {
      promise = this.bookApiService.postBook(body).toPromise();
    }

    promise.then((data: any) => {
      this.router.navigateByUrl('/books');
    }).catch((error: any) => {
      this.router.navigateByUrl('/books');
    });
  }
}
