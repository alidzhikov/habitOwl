import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Habit } from "../models/habit";
import { HabitService } from "../services/habit.service";
import { Streak } from "../models/streak";
import { habitCategoryColors } from "../models/habit-category";
@Component({
  selector: "howl-calendar",
  template: `
    <div class="calendar-wrapper col-xs-4" [ngStyle]="{'border-left': getCategoryColor(_habit)}">
      <mat-card [ngClass]="{'calendar-card': !isReordering, 'calendar-card-reordering': isReordering }">
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
          <mat-card-subtitle *ngIf="!isReordering">{{ _habit?.desiredFrequency }}</mat-card-subtitle>
          <howl-period-btn
          *ngIf="!isReordering"
          (changePeriod)="changePeriod($event)"
          ></howl-period-btn>
          {{ currentMonth }}
          </mat-card-header>
        <mat-card-content *ngIf="!isReordering">
          <mat-card-subtitle *ngIf="_habit && _habit.comment && _habit.comment.length>0">{{ _habit?.comment }}</mat-card-subtitle>
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
    ".calendar-card{max-width: 500px; min-height:204px}",
    ".calendar-card-reordering{min-width: 500px}",    
    ".calendar-wrapper{display:inline-block;vertical-align: top;}",
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
  @Input() isReordering: boolean;
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

  getCategoryColor(habit: Habit){
    if(!habit || !habit.category){return;}
    return '5px solid ' + habitCategoryColors[habit.category.id];
  }
}
