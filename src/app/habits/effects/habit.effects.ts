import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY as empty, of, Observable, defer } from "rxjs";
import { map, switchMap, mergeMap, tap, first } from "rxjs/operators";
import { Habit } from "@howl/habits/models/habit";
import { HabitCollectionActions } from "@howl/habits/actions";
import { HabitHttpService } from "../services/habit-http.service";
import { Act } from "../models/act";
import * as moment from "moment";
import { HabitCategory, HabitCategoryType } from "../models/habit-category";
import {
  DesiredFrequency,
  DesiredFrequencyType
} from "../models/desired-frequency";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromHabits from "@howl/habits/reducers";

@Injectable()
export class HabitEffects {
  @Effect()
  loadHabits$: Observable<any> = defer(() => {
    return of(initialActs).pipe(
      mergeMap((acts: Act[]) => {
        return of(habits).pipe(
          map(habits => {
            acts.forEach(act =>
              habits.forEach(habit => {
                if (habit && act.habitId == habit.id) {
                  habit.acts = [...habit.acts, act];
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
  });

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
                habit.acts = [...habit.acts, act];
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

  @Effect()
  addHabit$ = this.actions$.pipe(
    ofType(HabitCollectionActions.HabitCollectionActionTypes.AddHabitToDb),
    mergeMap((action: any) =>
      this.store.pipe(
        select(fromHabits.getAllHabits),
        first(),
        map(habits => {
          let habit = action.payload.clone();
          habit.id = habits[habits.length - 1].id + 1;
          return habit;
        })
      )
    ),
    switchMap(habit => {
      return of(new HabitCollectionActions.AddHabit(habit));
    })
  );
  @Effect()
  editHabit$ = this.actions$.pipe(
    ofType(HabitCollectionActions.HabitCollectionActionTypes.EditHabitDb),
    map((action: any) => {
      return action.payload;
    }),
    switchMap(habit => {
      return of(new HabitCollectionActions.EditHabit(habit));
    })
  );

  @Effect({ dispatch: false })
  removeHabit$ = this.actions$.pipe(
    ofType(HabitCollectionActions.HabitCollectionActionTypes.RemoveHabit),
    map((action: any) => {
      return action.payload;
    }),
    tap(() => this.router.navigate(["/"]))
  );
  constructor(
    private actions$: Actions,
    private habitsHttpService: HabitHttpService,
    private router: Router,
    private store: Store<fromHabits.State>
  ) {}
}

/*
 * Mock values for Habits and Acts
 */

const habits = [
  new Habit(
    "Workout",
    "5 times a week",
    new HabitCategory(HabitCategoryType.Health),
    new DesiredFrequency(DesiredFrequencyType.ThreeTimesAWeek),
    [],
    1
  ),
  new Habit(
    "Read",
    "its nice",
    new HabitCategory(HabitCategoryType.PersonalDevelopment),
    new DesiredFrequency(DesiredFrequencyType.Everyday),
    [],
    2,
    moment()
      .subtract(26, "days")
      .toDate()
  ),
  new Habit(
    "Dance",
    "5 times a week",
    new HabitCategory(HabitCategoryType.Health),
    new DesiredFrequency(DesiredFrequencyType.OnceAWeek),
    [],
    3,
    moment()
      .subtract(34, "days")
      .toDate()
  ),
  new Habit(
    "Jump",
    "12 times a day",
    new HabitCategory(HabitCategoryType.Work),
    new DesiredFrequency(DesiredFrequencyType.ThreeTimesAWeek),
    [],
    4,
    moment()
      .subtract(140, "days")
      .toDate()
  ),
  new Habit(
    "Cry",
    "0.2 times a week",
    new HabitCategory(HabitCategoryType.Spirituality),
    new DesiredFrequency(DesiredFrequencyType.OnceAMonth),
    [],
    5
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
