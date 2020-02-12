import { NgModule } from "@angular/core";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatRadioModule
} from "@angular/material";
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    DragDropModule,
    MatDatepickerModule,
    MatRadioModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    DragDropModule,
    MatDatepickerModule,
    MatRadioModule
  ]
})
export class MaterialModule {}
