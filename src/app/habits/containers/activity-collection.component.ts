import { Component, OnInit } from "@angular/core";
import { Habit } from "../models/habit";
import { Observable, from, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromHabits from "@howl/habits/reducers";
import { HabitCollectionActions } from "@howl/habits/actions";

@Component({
  selector: "howl-habits-list",
  template: `
    <howl-calendar
      *ngFor="let habit of (habits$ | async)"
      [habit]="habit"
      (toggleFulfilledEmitter)="toggleFulfilled($event)"
    >
    </howl-calendar>
  `
})
export class ActivityCollectionComponent implements OnInit {
  habits$: Observable<Habit[]>;

  constructor(private store: Store<fromHabits.State>) {
    this.habits$ = this.store.pipe(select(fromHabits.getAllHabits));
  }

  ngOnInit() {
    this.store.dispatch(new HabitCollectionActions.LoadHabits());
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    this.store.dispatch(new HabitCollectionActions.AddOrEditAct(ev));
  }
}
