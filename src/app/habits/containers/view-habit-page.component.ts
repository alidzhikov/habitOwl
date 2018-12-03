import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Habit } from "../models/habit";
import * as fromHabits from "@howl/habits/reducers";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap } from "rxjs/operators";
import { HabitCollectionActions } from "../actions";

@Component({
  selector: "howl-view-page",
  template: `
    <howl-calendar
      [habit]="habit$ | async"
      (toggleFulfilledEmitter)="toggleFulfilled($event)"
    >
    </howl-calendar>
  `
})
export class ViewHabitPageComponent {
  habit$: Observable<Habit>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromHabits.State>
  ) {
    this.habit$ = this.route.params.pipe(
      map(params => +params["id"] - 1),
      mergeMap(id =>
        this.store.pipe(
          select(fromHabits.getAllHabits),
          map(habits => habits[id])
        )
      )
    );
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    this.store.dispatch(new HabitCollectionActions.AddOrEditAct(ev));
  }
}
