import { Action } from "@ngrx/store";
import { Habit } from "../models/habit";

export enum HabitsPageActionTypes {
  LoadHabits = "[Habit Page] Load Habits",
  AddHabit = "[Habit Page] Add Habit",
  AddHabits = "[Habit Page] Add Habits",
  EditHabit = "[Habit Page] Edit Habit", // this should be in view habit page
  RemoveHabit = "[Habit Page] Remove Habit"
}
/**
 * Load Habits
 */
export class LoadHabits implements Action {
  readonly type = HabitsPageActionTypes.LoadHabits;
}

/**
 * Add Habits to Collection Action
 */
export class AddHabits implements Action {
  readonly type = HabitsPageActionTypes.AddHabits;

  constructor(public payload: Habit[]) {}
}
/**
 * Add Habit to Collection Action
 */
export class AddHabit implements Action {
  readonly type = HabitsPageActionTypes.AddHabit;

  constructor(public payload: Habit) {}
}

/**
 * Edit Habit from Collection Action   this should be in habit view page
 */
export class EditHabit implements Action {
  readonly type = HabitsPageActionTypes.EditHabit;

  constructor(public payload: Habit) {}
}

/**
 * Remove Habit from Collection Action
 */
export class RemoveHabit implements Action {
  readonly type = HabitsPageActionTypes.RemoveHabit;

  constructor(public payload: Habit) {}
}

export type HabitsPageActionsUnion = AddHabit | EditHabit | RemoveHabit;
