import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY as empty, of } from "rxjs";
import { map, switchMap, mergeMap } from "rxjs/operators";
import { Habit } from "@howl/habits/models/habit";
import {
  HabitCollectionActions,
  CollectionApiActions
} from "@howl/habits/actions";
import { HabitsHttpService } from "../services/habits-http.service";
import { Act } from "../models/act";
import * as moment from "moment";
import { HabitCategory, HabitCategoryType } from "../models/habit-category";
import {
  DesiredFrequency,
  DesiredFrequencyType
} from "../models/desired-frequency";

@Injectable()
export class HabitEffects {
  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(HabitCollectionActions.HabitCollectionActionTypes.LoadHabits),
    mergeMap(() => of(initialActs)),
    mergeMap((acts: Act[]) => {
      return of(habits).pipe(
        map(habits => {
          acts.forEach(act =>
            habits.forEach(habit => {
              if (habit && act.habitId == habit.id) {
                if (habit.acts) {
                  habit.acts.push(act);
                } else {
                  habit.acts = [act];
                }
              }
            })
          );
          return habits;
        })
      );
    }),
    switchMap(habits => {
      return of(new HabitCollectionActions.AddHabits(habits));
    })
  );
  // return this.habitsHttpService.fetchAllHabits().pipe(
  //   map((response: {count:number, habits: Habit[]}) => {
  //     console.log(response.habits);
  //     //return //[
  //     return  new HabitCollectionActions.AddHabits(response.habits);
  //       //new CollectionApiActions.LoadHabitsSuccess(response.habits)
  //     //];
  //   }),
  //   catchError(error =>
  //     of(new CollectionApiActions.LoadHabitsFailure(error))
  //   )

  constructor(
    private actions$: Actions,
    private habitsHttpService: HabitsHttpService
  ) {}
}

/*
 * Mock values for Habits and Acts
 */

const habits = [
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
];
const initialActs: Act[] = [
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
  new Act(
    1,
    moment()
      .add(2, "days")
      .toDate(),
    9
  ),
  new Act(
    1,
    moment()
      .add(1, "days")
      .toDate(),
    10
  ),
  new Act(
    1,
    moment()
      .add(4, "days")
      .toDate(),
    11
  ),
  new Act(
    2,
    moment()
      .add(3, "days")
      .toDate(),
    12
  ),
  new Act(
    2,
    moment()
      .add(1, "days")
      .toDate(),
    13
  ),
  new Act(
    2,
    moment()
      .add(2, "days")
      .toDate(),
    14
  ),
  new Act(
    3,
    moment()
      .add(3, "days")
      .toDate(),
    15
  ),
  new Act(
    3,
    moment()
      .add(4, "days")
      .toDate(),
    16
  ),
  new Act(3, moment().toDate(), 17)
];
