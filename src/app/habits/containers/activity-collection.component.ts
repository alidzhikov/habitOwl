import { Component, OnInit } from "@angular/core";
import { Habit } from "../models/habit";
import { Observable, from, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromHabits from "@howl/habits/reducers";
import { HabitsPageActions } from "@howl/habits/actions";
import {
  DesiredFrequency,
  DesiredFrequencyType
} from "../models/desired-frequency";
import { HabitCategoryType, HabitCategory } from "../models/habit-category";
import { Act } from "../models/act";
import * as moment from "moment";
import { map, mergeMap } from "rxjs/operators";

@Component({
  selector: "howl-habits-list",
  template: `
    <howl-calendar
      *ngFor="let habit of (habitActs$ | async)"
      [habit]="habit"
    ></howl-calendar>
    <!--
      <howl-habit-li *ngFor="let habit of (habitActs$ | async)" [habit]="habit"></howl-habit-li>
    -->
  `
})
export class ActivityCollectionComponent implements OnInit {
  habitActs$: Observable<Habit[]>;
  habits$: Observable<Habit[]>; //= of([]); // habits for testing

  acts$ = of([
    new Act(
      1,
      moment()
        .subtract(2, "days")
        .toDate(),
      1
    ),
    new Act(
      1,
      moment()
        .subtract(1, "days")
        .toDate(),
      2
    ),
    new Act(
      1,
      moment()
        .subtract(4, "days")
        .toDate(),
      3
    ),
    new Act(
      2,
      moment()
        .subtract(3, "days")
        .toDate(),
      4
    ),
    new Act(
      2,
      moment()
        .subtract(1, "days")
        .toDate(),
      5
    ),
    new Act(
      2,
      moment()
        .subtract(2, "days")
        .toDate(),
      6
    ),
    new Act(
      3,
      moment()
        .subtract(3, "days")
        .toDate(),
      7
    ),
    new Act(
      3,
      moment()
        .subtract(4, "days")
        .toDate(),
      8
    ),
    new Act(3, moment().toDate(), 9)
  ]);
  constructor(private store: Store<fromHabits.State>) {
    //this.store.dispatch(new )
  }

  ngOnInit() {
    // this.habits$ = ;

    this.habitActs$ = this.acts$.pipe(
      mergeMap(acts =>
        this.store.pipe(select(fromHabits.getAllHabits)).pipe(
          map(habits => {
            console.log(habits);

            habits.forEach(habit =>
              acts.map(act => {
                if (act.habitId == habit.id) {
                  if (habit.acts) {
                    habit.acts.push(act);
                  } else {
                    habit.acts = [act];
                  }
                }
              })
            );
            console.log(habits);
            return habits;
          })
        )
      )
    );
    this.store
      .pipe(
        select(fromHabits.getAllHabits),
        map(state => state)
      )
      .subscribe(res => {
        console.log(res);
      });
    //this.store.dispatch(new HabitsPageActions.LoadHabits());
  }
}
