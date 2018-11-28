import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { Habit } from '@howl/Habits/models/Habit';
import {
  HabitsPageActions,
  CollectionApiActions,
} from '@howl/Habits/actions';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('Habits_app');
  });

  @Effect()
  addHabitToCollection$: Observable<Action> = this.actions$.pipe(
    ofType<HabitsPageActions.AddHabit>(
        HabitsPageActions.HabitsPageActionTypes.AddHabit
    ),
    map(action => action.payload),
    mergeMap(Habit =>
      this.db.insert('Habits', [Habit]).pipe(
        map(() => new CollectionApiActions.AddHabitSuccess(Habit)),
        catchError(() => of(new CollectionApiActions.AddHabitFailure(Habit)))
      )
    )
  );

  @Effect()
  removeHabitFromCollection$: Observable<Action> = this.actions$.pipe(
    ofType<HabitsPageActions.RemoveHabit>(
        HabitsPageActions.HabitsPageActionTypes.RemoveHabit
    ),
    map(action => action.payload),
    mergeMap(Habit =>
      this.db.executeWrite('Habits', 'delete', [Habit.id]).pipe(
        map(() => new CollectionApiActions.RemoveHabitSuccess(Habit)),
        catchError(() => of(new CollectionApiActions.RemoveHabitFailure(Habit)))
      )
    )
  );

  constructor(private actions$: Actions, private db: Database) {}
}
