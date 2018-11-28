import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from '@howl/books/components/book-authors.component';
import { BookDetailComponent } from '@howl/books/components/book-detail.component';
import { BookPreviewComponent } from '@howl/books/components/book-preview.component';
import { BookPreviewListComponent } from '@howl/books/components/book-preview-list.component';
import { BookSearchComponent } from '@howl/books/components/book-search.component';

import { PipesModule } from '@howl/shared/pipes';
import { MaterialModule } from '@howl/material';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
