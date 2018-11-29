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

@Component({
  selector: "howl-habits-list",
  template: `
    <howl-calendar
      *ngFor="let habit of (habits$ | async)"
      [habit]="habit"
    ></howl-calendar>
    <!--
      <howl-habit-li *ngFor="let habit of (habits$ | async)" [habit]="habit"></howl-habit-li>
    -->
  `
})
export class ActivityCollectionComponent implements OnInit {
  habits$: Observable<Habit[]> = of([
    new Habit(
      1,
      "Workout",
      "5 times a week",
      new HabitCategory(HabitCategoryType.Health),
      new DesiredFrequency(DesiredFrequencyType.ThreeTimesAWeek)
    ),
    new Habit(
      2,
      "Read",
      "its nice",
      new HabitCategory(HabitCategoryType.PersonalDevelopment),
      new DesiredFrequency(DesiredFrequencyType.Everyday)
    ),
    new Habit(
      3,
      "Dance",
      "5 times a week",
      new HabitCategory(HabitCategoryType.Health),
      new DesiredFrequency(DesiredFrequencyType.OnceAWeek)
    ),
    new Habit(
      4,
      "Jump",
      "12 times a day",
      new HabitCategory(HabitCategoryType.Work),
      new DesiredFrequency(DesiredFrequencyType.ThreeTimesAWeek)
    ),
    new Habit(
      5,
      "Cry",
      "0.2 times a week",
      new HabitCategory(HabitCategoryType.Spirituality),
      new DesiredFrequency(DesiredFrequencyType.OnceAMonth)
    )
  ]); // habits for testing

  constructor(private store: Store<fromHabits.State>) {
    //this.store.dispatch(new )
    //this.habits$ = store.pipe(select(fromHabits.getAllHabits))
  }

  ngOnInit() {
    this.store.dispatch(new HabitsPageActions.LoadHabits());
  }
}
