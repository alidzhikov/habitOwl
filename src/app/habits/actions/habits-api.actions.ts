import { Action } from '@ngrx/store';
import { Habit } from '@howl/habits/models/habit';

export enum HabitsApiActionTypes {
  SearchSuccess = '[Habits/API] Search Success',
  SearchFailure = '[Habits/API] Search Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchSuccess implements Action {
  readonly type = HabitsApiActionTypes.SearchSuccess;

  constructor(public payload: Habit[]) {}
}

export class SearchFailure implements Action {
  readonly type = HabitsApiActionTypes.SearchFailure;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type HabitsApiActionsUnion = SearchSuccess | SearchFailure;
