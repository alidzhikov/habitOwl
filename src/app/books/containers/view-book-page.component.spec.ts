import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material';

import { ViewBookPageComponent } from '@howl/books/containers/view-book-page.component';
import { ViewBookPageActions } from '@howl/books/actions';
import * as fromBooks from '@howl/books/reducers';
import { SelectedBookPageComponent } from '@howl/books/containers/selected-book-page.component';
import { BookDetailComponent } from '@howl/books/components/book-detail.component';
import { BookAuthorsComponent } from '@howl/books/components/book-authors.component';
import { AddCommasPipe } from '@howl/shared/pipes/add-commas.pipe';

describe('View Book Page', () => {
  const params = new BehaviorSubject({});
  let fixture: ComponentFixture<ViewBookPageComponent>;
  let store: Store<fromBooks.State>;
  let instance: ViewBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params },
        },
        {
          provide: Store,
          useValue: {
            select: jest.fn(),
            next: jest.fn(),
            pipe: jest.fn(),
          },
        },
      ],
      declarations: [
        ViewBookPageComponent,
        SelectedBookPageComponent,
        BookDetailComponent,
        BookAuthorsComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(ViewBookPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a book.Select action on init', () => {
    const action = new ViewBookPageActions.SelectBook('2');
    params.next({ id: '2' });

    fixture.detectChanges();

    expect(store.next).toHaveBeenLastCalledWith(action);
  });
});
