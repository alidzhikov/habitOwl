import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Habit } from "../models/habit";
import * as moment from "moment";

@Component({
  selector: "howl-calendar-date-btn",
  template: `
    <button
      mat-button
      [ngClass]="{
        'today-date': isToday(date),
        'fulfiled-date': isFulfilled(date, habit)
      }"
      (click)="toggleFulfilled.emit({ date: date, habit: habit })"
    >
      {{ date | date: "dd" }}
    </button>
  `,
  styles: [
    ".today-date { border: 1px solid green; }",
    ".fulfiled-date { background-color: #4f6991;border-width: 3px; }",
    "button { border-radius: 50%; width: 64px; height: 64px; }"
  ]
})
export class CalendarDateBtn {
  @Input() date: Date;
  @Input() habit: Habit;
  @Output() toggleFulfilled = new EventEmitter<{ date: Date; habit: Habit }>();

  isToday(date: Date) {
    return moment()
      .startOf("day")
      .isSame(moment(date));
  }

  isFulfilled(date: Date, habit: Habit) {
    let res = false;
    if (!habit || !habit.acts) {
      return res;
    }
    habit.acts.forEach(act => {
      let actDate = moment(act.date).startOf("day");
      if (actDate.isSame(moment(date))) {
        res = true;
      }
    });
    return res;
  }
}
