import { Component } from "@angular/core";
import { Habit } from "../models/habit";
import { Observable, from, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromHabits from "@howl/habits/reducers";
import { HabitCollectionActions } from "@howl/habits/actions";
import { MatDialog } from "@angular/material";
import { HabitDialogComponent } from "../components/add-habit-dialog.component";

@Component({
  selector: "howl-habits-list",
  template: `
    <howl-calendar
      *ngFor="let habit of (habits$ | async)"
      [period]="'week'"
      [habit]="habit"
      (toggleFulfilledEmitter)="toggleFulfilled($event)"
    >
    </howl-calendar>
    <howl-add-habit (createHabitDialog)="openHabitDialog()"></howl-add-habit>
  `
})
export class ActivityCollectionComponent {
  habits$: Observable<Habit[]>;

  constructor(
    private store: Store<fromHabits.State>,
    private dialog: MatDialog
  ) {
    this.habits$ = this.store.pipe(select(fromHabits.getAllHabits));
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    this.store.dispatch(new HabitCollectionActions.AddOrEditAct(ev));
  }

  openHabitDialog() {
    let dialogRef = this.dialog.open(HabitDialogComponent, {
      data: { addOrEdit: "New" }
    });

    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
}
