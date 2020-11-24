import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookApiService } from 'src/app/services/book-api.service';
import { AuthorApiService } from 'src/app/services/author-api.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  author = {
    books: [],
    secondaryBooks: [],
    id: '',
    name: '',
  };

  form_secondaryBooks = [];
  form_AuthorName = '';

  books = null;
  mainBooks = [];
  secondaryBooks = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookApiService: BookApiService,
    private authorApiService: AuthorApiService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.authorApiService.getAuthor(params.get('id')).toPromise().then((data: any) => {
          this.author = data;
          this.mainBooks = this.author.books;
          this.secondaryBooks = this.author.secondaryBooks;

          this.form_AuthorName = this.author.name;
          this.form_secondaryBooks = this.author.secondaryBooks;
        })
      }
    });
  }

  getBooks(): void {
    this.bookApiService.getBooks().toPromise().then(
      (data) => {
        this.books = data["hydra:member"];
      })
  }

  handleForm(): void {
    let body = {
      name: this.form_AuthorName,
      books: this.mainBooks,
      secondaryBooks: this.form_secondaryBooks,
    }

    let promise: Promise<any>;

    if (this.author.id) {
      promise = this.authorApiService.putAuthor(this.author.id, body).toPromise();
    } else {
      promise = this.authorApiService.postAuthor(body).toPromise();
    }

    promise.then((data: any) => {
      this.router.navigateByUrl('/authors');
    }).catch((error: any) => {
      this.router.navigateByUrl('/authors');
    });
  }
}
