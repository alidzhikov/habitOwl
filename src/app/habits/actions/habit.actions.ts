import { Action } from '@ngrx/store';
import { Habit } from '@howl/habits/models/habit';

export enum HabitActionTypes {
  LoadHabit = '[Habit Exists Guard] Load Habit',
}

export class LoadHabit implements Action {
  readonly type = HabitActionTypes.LoadHabit;

  constructor(public payload: Habit) {}
}

export type HabitActionsUnion = LoadHabit;
