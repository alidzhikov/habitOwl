import { Action } from "@ngrx/store";
import { Habit } from "../models/habit";
import { Act } from "../models/act";

export enum HabitCollectionActionTypes {
  LoadHabits = "[Habit Collection] Load Habits",
  AddHabit = "[Habit Collection] Add Habit",
  AddHabitToDb = "[Habit Collection] Add Habit to db",
  AddHabits = "[Habit Collection] Add Habits",
  EditHabit = "[Habit Collection] Edit Habit", // this should be in view habit page
  EditHabitDb = "[Habit Collection] Edit Habit in db",
  RemoveHabit = "[Habit Collection] Remove Habit",
  EditHabits = "[Habit Collection] Edit Habits",
  AddActDb = "[Habit Collection] Add Act to db",
  AddAct = "[Habit Collection] Add Act",
  RemoveActDb = "[Habit Collection] Remove Act from db",
  RemoveAct = "[Habit Collection] Remove Act",
  DragSort = "[Habit Collection] Drag Sort",
  ConfiguredSort = "[Habit Collection] Configured Sort"
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
 * Add an act to a habit in a db
 */
export class AddActDb implements Action {
  readonly type = HabitCollectionActionTypes.AddActDb;

  constructor(public payload: { date: Date; habit: Habit }) {}
}

/**
 * Add an act to a habit
 */
export class AddAct implements Action {
  readonly type = HabitCollectionActionTypes.AddAct;

  constructor(public payload: Act) {}
}

/**
 * Remove an act from a habit
 */
export class RemoveActDb implements Action {
  readonly type = HabitCollectionActionTypes.RemoveActDb;

  constructor(public payload: Act) {}
}

/**
 * Remove an act from a habit
 */
export class RemoveAct implements Action {
  readonly type = HabitCollectionActionTypes.RemoveAct;

  constructor(public payload: Act) {}
}


/**
 * Change sorting of 2 habits (from drag sort)
 */
export class DragSort implements Action {
  readonly type = HabitCollectionActionTypes.DragSort;

  constructor(public payload: number[]) {}
}

/**
 * Sort habits according to the configured sorting (from local storage or db)
 */
export class ConfiguredSort implements Action {
  readonly type = HabitCollectionActionTypes.ConfiguredSort;

  constructor(public payload: number[]) {}
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
  | AddActDb
  | AddAct
  | RemoveActDb
  | RemoveAct
  | DragSort
  | ConfiguredSort;
