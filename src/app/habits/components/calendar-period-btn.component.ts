import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "howl-period-btn",
  template: `
    <button mat-flat-button (click)="changePeriod.emit('left')">
      <i class="material-icons"> keyboard_arrow_left </i>
    </button>
    <button mat-flat-button (click)="changePeriod.emit('right')">
      <i class="material-icons"> keyboard_arrow_right </i>
    </button>
  `,
  styles: ["button:focus {outline:0;}"]
})
export class PeriodButtonComponent {
  @Output() changePeriod = new EventEmitter<"left" | "right">();
}
