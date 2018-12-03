import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Habit } from "../models/habit";
@Component({
  selector: "howl-calendar",
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title [routerLink]="['/habits', habit?.id]">{{
          habit?.name
        }}</mat-card-title>
        <mat-card-subtitle>{{ habit?.comment }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <howl-calendar-date-btn
          *ngFor="let date of daysOfWeek"
          [habit]="habit"
          [date]="date"
          (toggleFulfilled)="toggleFulfilledEmit($event)"
        >
        </howl-calendar-date-btn>
      </mat-card-content>
    </mat-card>
  `
})
export class HabitCalendarComponent implements OnInit {
  @Input() habit: any;
  @Output() toggleFulfilledEmitter = new EventEmitter<{
    date: Date;
    habit: Habit;
  }>();

  daysOfWeek;
  today = moment()
    .startOf("day")
    .toDate();

  ngOnInit() {
    this.daysOfWeek = this.currentWeekDays();
  }

  currentWeekDays() {
    const startOfWeek = moment().startOf("isoWeek");
    const endOfWeek = moment().endOf("isoWeek");
    let days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  }

  toggleFulfilledEmit(ev: { date: Date; habit: Habit }) {
    this.toggleFulfilledEmitter.emit(ev);
  }
}
