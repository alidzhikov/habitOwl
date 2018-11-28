import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBooks from '@howl/books/reducers';
import { SelectedBookPageActions } from '@howl/books/actions';
import { Book } from '@howl/books/models/book';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<fromBooks.State>) {
    this.book$ = store.pipe(select(fromBooks.getSelectedBook)) as Observable<
      Book
    >;
    this.isSelectedBookInCollection$ = store.pipe(
      select(fromBooks.isSelectedBookInCollection)
    );
  }

  addToCollection(book: Book) {
    this.store.dispatch(new SelectedBookPageActions.AddBook(book));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(new SelectedBookPageActions.RemoveBook(book));
  }
}
