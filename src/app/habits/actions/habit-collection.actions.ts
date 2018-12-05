import { Action } from "@ngrx/store";
import { Habit } from "../models/habit";

export enum HabitCollectionActionTypes {
  LoadHabits = "[Habit Collection] Load Habits",
  AddHabit = "[Habit Collection] Add Habit",
  AddHabitToDb = "[Habit Collection] Add Habit to db",
  AddHabits = "[Habit Collection] Add Habits",
  EditHabit = "[Habit Collection] Edit Habit", // this should be in view habit page
  EditHabitDb = "[Habit Collection] Edit Habit in db",
  RemoveHabit = "[Habit Collection] Remove Habit",
  EditHabits = "[Habit Collection] Edit Habits",
  AddOrEditAct = "[Habit Collection] Add or edit Habits"
}
/**
 * Load Habits
 */
export class LoadHabits implements Action {
  readonly type = HabitCollectionActionTypes.LoadHabits;
}

/**
 * Add Habits to Collection Action
 */
export class AddHabits implements Action {
  readonly type = HabitCollectionActionTypes.AddHabits;

  constructor(public payload: Habit[]) {}
}
/**
 * Add Habit to Collection Action
 */
export class AddHabit implements Action {
  readonly type = HabitCollectionActionTypes.AddHabit;

  constructor(public payload: Habit) {}
}
/**
 * Add Habit to Db Action
 */
export class AddHabitToDb implements Action {
  readonly type = HabitCollectionActionTypes.AddHabitToDb;

  constructor(public payload: Habit) {}
}

/**
 * Edit Habit from Collection Action
 */
export class EditHabit implements Action {
  readonly type = HabitCollectionActionTypes.EditHabit;

  constructor(public payload: Habit) {}
}
/**
 * Edit Habit in Db from Collection Action
 */
export class EditHabitDb implements Action {
  readonly type = HabitCollectionActionTypes.EditHabitDb;

  constructor(public payload: Habit) {}
}

/**
 * Remove Habit from Collection Action
 */
export class RemoveHabit implements Action {
  readonly type = HabitCollectionActionTypes.RemoveHabit;

  constructor(public payload: number) {}
}
/**
 * Set the acts of a habit
 */
export class EditHabits implements Action {
  readonly type = HabitCollectionActionTypes.EditHabits;

  constructor(public payload: Habit[]) {}
}
/**
 * Add or edit an act of a habit
 */
export class AddOrEditAct implements Action {
  readonly type = HabitCollectionActionTypes.AddOrEditAct;

  constructor(public payload: { date: Date; habit: Habit }) {}
}

export type HabitCollectionActionsUnion =
  | LoadHabits
  | AddHabit
  | AddHabitToDb
  | AddHabits
  | EditHabit
  | EditHabitDb
  | RemoveHabit
  | EditHabits
  | AddOrEditAct;
