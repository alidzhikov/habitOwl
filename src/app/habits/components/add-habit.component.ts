import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "howl-add-habit",
  template: `
    <button mat-fab color="primary" id="fab" (click)="createHabitDialog.emit()">
      <i class="material-icons">add </i>
    </button>
  `,
  styles: [
    "#fab {top: auto !important;right: 20px !important;bottom: 10px !important;left: auto !important; position: fixed !important;}"
  ]
})
export class AddHabitComponent {
  @Output() createHabitDialog = new EventEmitter();
}
