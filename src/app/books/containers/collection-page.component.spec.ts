import { CollectionPageComponent } from '@howl/books/containers/collection-page.component';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule, MatInputModule } from '@angular/material';
import { BookPreviewListComponent } from '@howl/books/components/book-preview-list.component';
import { BookPreviewComponent } from '@howl/books/components/book-preview.component';
import { CollectionPageActions } from '@howl/books/actions';
import * as fromBooks from '@howl/books/reducers';
import { EllipsisPipe } from '@howl/shared/pipes/ellipsis.pipe';
import { AddCommasPipe } from '@howl/shared/pipes/add-commas.pipe';
import { BookAuthorsComponent } from '@howl/books/components/book-authors.component';

describe('Collection Page', () => {
  let fixture: ComponentFixture<CollectionPageComponent>;
  let store: Store<fromBooks.State>;
  let instance: CollectionPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          books: combineReducers(fromBooks.reducers),
        }),
        MatCardModule,
        MatInputModule,
        RouterTestingModule,
      ],
      declarations: [
        CollectionPageComponent,
        BookPreviewListComponent,
        BookPreviewComponent,
        BookAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
    });

    fixture = TestBed.createComponent(CollectionPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.Load on init', () => {
    const action = new CollectionPageActions.LoadCollection();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
