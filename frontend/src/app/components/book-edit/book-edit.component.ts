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
  main_author = '';
  book_authors = [];

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
          this.main_author = this.book.mainAuthor;
          this.book_authors = this.book.authors;
          this.form_authors = this.book.authors;
          this.form_price = this.book.price;
          this.form_title = this.book.title;
          this.form_category = this.book.category;
          this.form_author = this.book.mainAuthor;
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
    let body = {
      title: this.form_title,
      category: this.form_category,
      price: parseInt(this.form_price),
      mainAuthor: this.form_author,
      authors: this.form_authors,
    }

    if (this.book.id) {
      this.bookApiService.putBook(this.book.id, body).toPromise().then((data) => {
        this.router.navigateByUrl('/books');
      })
    } else {
      this.bookApiService.postBook(body).toPromise().then((data) => {
        this.router.navigateByUrl('/books');
      })
    }
  }
}
