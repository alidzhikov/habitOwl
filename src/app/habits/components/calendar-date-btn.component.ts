import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Habit } from "../models/habit";
import * as moment from "moment";

@Component({
  selector: "howl-calendar-date-btn",
  template: `
    <br *ngIf="index > 0 && index % 7 == 0" />
    <button
      mat-button
      [ngClass]="{
        'today-date': isToday(date),
        'fulfiled-date': isFulfilled(date, habit),
        'out-of-period-date': isOutOfPeriodDate(date)
      }"
      (click)="toggleFulfilled.emit({ date: date, habit: habit })"
    >
      {{ date | date: "dd" }}
    </button>
  `,
  styles: [
    ".today-date { border: 1px solid green; }",
    ".out-of-period-date { opacity: 0.4; }",
    ".fulfiled-date { background-color: #4f6991;border-width: 3px; }",
    "button { border-radius: 50%; width: 64px; height: 64px; }"
  ]
})
export class CalendarDateBtn {
  @Input() date: Date;
  @Input() habit: Habit;
  @Input() period: "month" | "week";
  @Input() index: number;
  @Input() referenceDate: any;
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

  isOutOfPeriodDate(date: Date) {
    let period: "isoWeek" | "month" =
      this.period == "week" ? "isoWeek" : "month";
    return (
      moment(date)
        .startOf("day")
        .isAfter(moment(this.referenceDate.toDate()).endOf(period)) ||
      moment(date)
        .startOf("day")
        .isBefore(moment(this.referenceDate.toDate()).startOf(period))
    );
  }
}
