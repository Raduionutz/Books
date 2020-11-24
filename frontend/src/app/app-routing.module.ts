import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/create', component: BookEditComponent },
  { path: 'books/edit/:id', component: BookEditComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'authors/create', component: AuthorEditComponent },
  { path: 'authors/edit/:id', component: AuthorEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
