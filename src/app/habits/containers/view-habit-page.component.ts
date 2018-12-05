import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Habit } from "../models/habit";
import * as fromHabits from "@howl/habits/reducers";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap, first, tap } from "rxjs/operators";
import { HabitCollectionActions } from "../actions";
import { MatDialog } from "@angular/material";
import { HabitDialogComponent } from "../components/add-habit-dialog.component";
import { BooleanDialogComponent } from "@howl/habits/components/boolean-dialog.component";

@Component({
  selector: "howl-view-page",
  template: `
    <howl-calendar
      [habit]="habit$ | async"
      [period]="'month'"
      (toggleFulfilledEmitter)="toggleFulfilled($event)"
    >
    </howl-calendar>
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ (habit$ | async).name }}</mat-card-title>
        <mat-card-subtitle> {{ (habit$ | async).comment }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          Category: {{ (habit$ | async).category }} <br />
          Desired frequency: {{ (habit$ | async).desiredFrequency }}<br />
          {{
            (habit$ | async).createdAt
              ? "Created at: " + ((habit$ | async).createdAt | date)
              : ""
          }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="openHabitDialog(habit$)">
          <i class="material-icons">create</i>
        </button>
        <button mat-button (click)="removeHabit(habit$)">
          <i class="material-icons">remove_circle</i>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ["mat-card{max-width:500px;}"]
})
export class ViewHabitPageComponent {
  habit$: Observable<Habit>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromHabits.State>,
    private dialog: MatDialog
  ) {
    this.habit$ = this.route.params.pipe(
      map(params => +params["id"]),
      mergeMap(id =>
        this.store.pipe(
          select(fromHabits.getAllHabits),
          tap(res => console.log(res)),
          map(habits => habits.find(habit => habit.id == id))
        )
      )
    );
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    this.store.dispatch(new HabitCollectionActions.AddOrEditAct(ev));
  }

  openHabitDialog() {
    this.habit$.pipe(first()).subscribe(habit => {
      let dialogRef = this.dialog.open(HabitDialogComponent, {
        data: { addOrEdit: "Edit", habit: habit }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res && res.habit) {
          this.store.dispatch(
            new HabitCollectionActions.EditHabitDb(res.habit)
          );
        }
      });
    });
  }

  removeHabit() {
    this.habit$.pipe(first()).subscribe(habit => {
      let dialogRef = this.dialog.open(BooleanDialogComponent, {
        data: {
          text: "Are you sure you want to delete " + habit.name + " habit?"
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res && res.res && habit && habit.id) {
          this.store.dispatch(new HabitCollectionActions.RemoveHabit(habit.id));
        }
      });
    });
  }
}
