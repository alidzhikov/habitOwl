import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Habit } from "../models/habit";
import * as moment from "moment";
import { HabitService } from "../services/habit.service";
import { Streak } from "../models/streak";

@Component({
  selector: "howl-habit-details",
  template: `
    <mat-card class="col-xs-4" *ngIf="_habit">
      <mat-card-header>
        <mat-card-title>{{ _habit?.name }}</mat-card-title>
        <mat-card-subtitle> {{ _habit?.comment }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          Description: {{ _habit?.comment }}<br />
          Category: {{ _habit?.category }} <br />
          {{
            _habit?.createdAt ? "Created at: " + (_habit?.createdAt | date) : ""
          }}
          <br *ngIf="streak" />
          {{
            streak
              ? " Longest streak: " +
                streak?.count +
                " started " +
                (streak?.startDate | date)
              : ""
          }}
          <br />
          {{
            currentStreak
              ? "Current streak: " +
                currentStreak?.count +
                " started " +
                (currentStreak?.startDate | date)
              : ""
          }}
          <br *ngIf="currentStreak" />
          Success rate: {{ completedPercentage | number: "1.0-2" }}%
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="openHabitDialog.emit(_habit)">
          <i class="material-icons">create</i>
        </button>
        <button mat-button (click)="removeHabit.emit(_habit)">
          <i class="material-icons">remove_circle</i>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ["mat-card{ max-width:500px; display:inline-block; }"]
})
export class HabitDetailsComponent {
  _habit: Habit;
  @Input()
  set habit(habit: Habit) {
    this.streak = this.habitService.getLongestStreak(habit);
    this.currentStreak = this.habitService.getCurrentStreak(habit);
    this.completedPercentage = this.habitService.getCompletionPercentage(habit);
    this._habit = habit;
  }
  completedPercentage: number;
  streak: Streak | undefined;
  currentStreak: Streak | undefined;
  @Output() openHabitDialog = new EventEmitter<Habit>();
  @Output() removeHabit = new EventEmitter<Habit>();

  constructor(private habitService: HabitService) {}
}
