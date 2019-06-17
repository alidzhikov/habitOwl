import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "howl-reorder-habit",
  template: `
    <button mat-fab *ngIf="!isReordering" color="primary" id="fab" (click)="reorderHabit.emit()">
      <i class="material-icons">shuffle </i>
    </button>
    <button mat-fab *ngIf="isReordering" color="warn" id="fab-1" (click)="reorderHabit.emit(false)">
        <i class="material-icons">close </i>
    </button>
    <button mat-fab *ngIf="isReordering" color="accent" id="fab" (click)="reorderHabit.emit(true)">
        <i class="material-icons">check </i>
    </button>
  `,
  styles: [
    "#fab {top: auto !important;right: 90px !important;bottom: 10px !important;left: auto !important; position: fixed !important;}",
    "#fab-1 {top: auto !important;right: 160px !important;bottom: 10px !important;left: auto !important; position: fixed !important;}"
  ]
})
export class ReorderHabitComponent {
  @Input() isReordering;  
  @Output() reorderHabit = new EventEmitter();
}
