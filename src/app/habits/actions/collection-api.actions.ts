import { Action } from '@ngrx/store';
import { Habit } from '@howl/Habits/models/Habit';

export enum CollectionApiActionTypes {
  AddHabitSuccess = '[Collection/API] Add Habit Success',
  AddHabitFailure = '[Collection/API] Add Habit Failure',
  RemoveHabitSuccess = '[Collection/API] Remove Habit Success',
  RemoveHabitFailure = '[Collection/API] Remove Habit Failure',
  LoadHabitsSuccess = '[Collection/API] Load Habits Success',
  LoadHabitsFailure = '[Collection/API] Load Habits Failure',
}

/**
 * Add Habit to Collection Actions
 */
export class AddHabitSuccess implements Action {
  readonly type = CollectionApiActionTypes.AddHabitSuccess;

  constructor(public payload: Habit) {}
}

export class AddHabitFailure implements Action {
  readonly type = CollectionApiActionTypes.AddHabitFailure;

  constructor(public payload: Habit) {}
}

/**
 * Remove Habit from Collection Actions
 */
export class RemoveHabitSuccess implements Action {
  readonly type = CollectionApiActionTypes.RemoveHabitSuccess;

  constructor(public payload: Habit) {}
}

export class RemoveHabitFailure implements Action {
  readonly type = CollectionApiActionTypes.RemoveHabitFailure;

  constructor(public payload: Habit) {}
}

/**
 * Load Collection Actions
 */
export class LoadHabitsSuccess implements Action {
  readonly type = CollectionApiActionTypes.LoadHabitsSuccess;

  constructor(public payload: Habit[]) {}
}

export class LoadHabitsFailure implements Action {
  readonly type = CollectionApiActionTypes.LoadHabitsFailure;

  constructor(public payload: any) {}
}

export type CollectionApiActionsUnion =
  | AddHabitSuccess
  | AddHabitFailure
  | RemoveHabitSuccess
  | RemoveHabitFailure
  | LoadHabitsSuccess
  | LoadHabitsFailure;
