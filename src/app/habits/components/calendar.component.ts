import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Habit } from "../models/habit";
@Component({
  selector: "howl-calendar",
  template: `
    <mat-card class="calendar-card">
      <mat-card-header>
        <mat-card-title [routerLink]="['/habits', habit?.id]" class="clickable">
          {{ habit?.name }}
        </mat-card-title>
        <mat-card-subtitle>{{ habit?.comment }}</mat-card-subtitle>
        <howl-period-btn
          (changePeriod)="changePeriod($event)"
        ></howl-period-btn>
        {{ currentMonth }}
      </mat-card-header>
      <mat-card-content>
        <howl-calendar-date-btn
          *ngFor="let date of daysOfPeriod; let i = index"
          [index]="i"
          [habit]="habit"
          [date]="date"
          [period]="period"
          [referenceDate]="referenceDate"
          (toggleFulfilled)="toggleFulfilledEmit($event)"
        >
        </howl-calendar-date-btn>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    ".clickable {cursor: pointer;}",
    ".calendar-card{max-width: 500px; margin-bottom:10px;}"
  ]
})
export class HabitCalendarComponent implements OnInit {
  @Input() habit: any;
  @Input() period: "week" | "month";
  @Output() toggleFulfilledEmitter = new EventEmitter<{
    date: Date;
    habit: Habit;
  }>();
  referenceDate = moment(); // defaults to today
  daysOfPeriod;
  today = moment()
    .startOf("day")
    .toDate();

  ngOnInit() {
    this.daysOfPeriod = this.getPeriod(this.period);
  }

  getPeriod(period: "week" | "month") {
    let startOf, endOf;
    if (period == "week") {
      startOf = moment(this.referenceDate.toDate()).startOf("isoWeek");
      endOf = moment(this.referenceDate.toDate()).endOf("isoWeek");
    } else {
      startOf = moment(this.referenceDate.toDate())
        .startOf("month")
        .isoWeekday(1);
      endOf = moment(this.referenceDate.toDate())
        .endOf("month")
        .isoWeekday(7);
    }
    let days = [];
    let day = startOf;
    while (day <= endOf) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  }

  toggleFulfilledEmit(ev: { date: Date; habit: Habit }) {
    this.toggleFulfilledEmitter.emit(ev);
  }

  changePeriod(ev: "left" | "right") {
    if (ev == "left") {
      this.referenceDate = this.referenceDate.subtract(1, this.period);
    } else if (ev == "right") {
      this.referenceDate = this.referenceDate.add(1, this.period);
    }
    this.daysOfPeriod = this.getPeriod(this.period);
  }

  get currentMonth() {
    return this.referenceDate.format("MMMM Y");
  }
}
