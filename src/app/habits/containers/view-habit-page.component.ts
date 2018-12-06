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
    <howl-habit-details
      [habit]="habit$ | async"
      (openHabitDialog)="openHabitDialog($event)"
      (removeHabit)="removeHabit($event)"
    ></howl-habit-details>
  `,
  styles: ["mat-card{max-width:500px;display:inline-block;}"]
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
          //tap(res => console.log(res)),
          map(habits => habits.find(habit => habit.id == id))
        )
      )
    );
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    this.store.dispatch(new HabitCollectionActions.AddOrEditAct(ev));
  }

  openHabitDialog(habit: Habit) {
    // this.habit$.pipe(first()).subscribe(habit => {
    let dialogRef = this.dialog.open(HabitDialogComponent, {
      data: { addOrEdit: "Edit", habit: habit }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.habit) {
        this.store.dispatch(new HabitCollectionActions.EditHabitDb(res.habit));
      }
    });
    //});
  }

  removeHabit(habit: Habit) {
    //this.habit$.pipe(first()).subscribe(habit => {
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
    //});
  }
}
