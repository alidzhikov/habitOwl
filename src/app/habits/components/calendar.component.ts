import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Habit } from "../models/habit";
import { HabitService } from "../services/habit.service";
import { Streak } from "../models/streak";
@Component({
  selector: "howl-calendar",
  template: `
    <div class="calendar-wrapper col-xs-4">
      <mat-card class="calendar-card">
        <mat-card-header>
          <mat-card-title
            [routerLink]="['/habits', _habit?.id]"
            class="clickable"
          >
            {{ _habit?.name
            }}<span *ngIf="currentStreak">
              <i class="material-icons hot-count-icon">whatshot</i
              ><sup style="font-size: 14px" class="hot-count">{{
                currentStreak?.count
              }}</sup></span
            >
          </mat-card-title>
          <mat-card-subtitle>{{ _habit?.desiredFrequency }}</mat-card-subtitle>
          <howl-period-btn
            (changePeriod)="changePeriod($event)"
          ></howl-period-btn>
          {{ currentMonth }}
        </mat-card-header>
        <mat-card-content>
          <howl-calendar-date-btn
            *ngFor="let date of daysOfPeriod; let i = index"
            [index]="i"
            [habit]="_habit"
            [date]="date"
            [period]="period"
            [referenceDate]="referenceDate"
            (toggleFulfilled)="toggleFulfilledEmit($event)"
          >
          </howl-calendar-date-btn>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    ".clickable {cursor: pointer;}",
    ".calendar-card{max-width: 500px; margin-bottom:10px;}",
    ".calendar-wrapper{display:inline-block}",
    ".hot-count-icon{vertical-align: top;color:red; background-color: #fff3a5; border-radius: 50%; font-size: 18px;}",
    ".hot-count{font-size: 14px;}"
  ]
})
export class HabitCalendarComponent implements OnInit {
  _habit: Habit;
  @Input()
  set habit(habit: Habit) {
    this.currentStreak = this.habitService.getCurrentStreak(habit);
    this._habit = habit;
  }
  @Input() period: "week" | "month";
  @Output() toggleFulfilledEmitter = new EventEmitter<{
    date: Date;
    habit: Habit;
  }>();
  currentStreak: Streak | undefined;
  referenceDate = moment(); // defaults to today
  daysOfPeriod;
  today = moment()
    .startOf("day")
    .toDate();

  constructor(public habitService: HabitService) {}
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
