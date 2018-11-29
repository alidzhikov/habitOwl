import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil
} from "rxjs/operators";

import { Habit } from "@howl/habits/models/habit";
import { HabitsPageActions, CollectionApiActions } from "@howl/habits/actions";
import { HabitsHttpService } from "../services/habits-http.service";

@Injectable()
export class HabitEffects {
  //    @Effect()
  //    search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
  //     Action
  //   > =>
  //     this.actions$.pipe(
  //       ofType<FindHabitPageActions.SearchHabits>(
  //         FindHabitPageActions.FindHabitPageActionTypes.SearchHabits
  //       ),
  //       debounceTime(debounce, scheduler),
  //       map(action => action.payload),
  //       switchMap(query => {
  //         if (query === '') {
  //           return empty;
  //         }

  //         const nextSearch$ = this.actions$.pipe(
  //           ofType(FindHabitPageActions.FindHabitPageActionTypes.SearchHabits),
  //           skip(1)
  //         );

  //         return this.googleHabits.searchHabits(query).pipe(
  //           takeUntil(nextSearch$),
  //           map((Habits: Habit[]) => new HabitsApiActions.SearchSuccess(Habits)),
  //           catchError(err => of(new HabitsApiActions.SearchFailure(err)))
  //         );
  //       })
  //     );

  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(HabitsPageActions.HabitsPageActionTypes.LoadHabits),
    switchMap(() => {
      return this.habitsHttpService.fetchAllHabits().pipe(
        map((response: {count:number, habits: Habit[]}) => {
          console.log(response.habits);
          //return //[ 
          return  new HabitsPageActions.AddHabits(response.habits);
            //new CollectionApiActions.LoadHabitsSuccess(response.habits)
          //];
        }),
        catchError(error =>
          of(new CollectionApiActions.LoadHabitsFailure(error))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private habitsHttpService: HabitsHttpService
  ) {}
}
