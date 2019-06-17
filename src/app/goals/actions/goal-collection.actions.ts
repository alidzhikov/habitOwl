import { Action } from "@ngrx/store";
import { Goal } from "../models/goal";

export enum GoalCollectionActionTypes {
  LoadGoals = "[Goal Collection] Load Goals",
  AddGoal = "[Goal Collection] Add Goal",
  AddGoalToDb = "[Goal Collection] Add Goal to db",
  AddGoals = "[Goal Collection] Add Goals",
  EditGoal = "[Goal Collection] Edit Goal", // this should be in view goal page
  EditGoalDb = "[Goal Collection] Edit Goal in db",
  RemoveGoal = "[Goal Collection] Remove Goal",
  EditGoals = "[Goal Collection] Edit Goals",
  AddOrEditAct = "[Goal Collection] Add or edit Goals"
}
/**
 * Load Goals
 */
export class LoadGoals implements Action {
  readonly type = GoalCollectionActionTypes.LoadGoals;
}

/**
 * Add Goals to Collection Action
 */
export class AddGoals implements Action {
  readonly type = GoalCollectionActionTypes.AddGoals;

  constructor(public payload: Goal[]) {}
}
/**
 * Add Goal to Collection Action
 */
export class AddGoal implements Action {
  readonly type = GoalCollectionActionTypes.AddGoal;

  constructor(public payload: Goal) {}
}
/**
 * Add Goal to Db Action
 */
export class AddGoalToDb implements Action {
  readonly type = GoalCollectionActionTypes.AddGoalToDb;

  constructor(public payload: Goal) {}
}

/**
 * Edit Goal from Collection Action
 */
export class EditGoal implements Action {
  readonly type = GoalCollectionActionTypes.EditGoal;

  constructor(public payload: Goal) {}
}
/**
 * Edit Goal in Db from Collection Action
 */
export class EditGoalDb implements Action {
  readonly type = GoalCollectionActionTypes.EditGoalDb;

  constructor(public payload: Goal) {}
}

/**
 * Remove Goal from Collection Action
 */
export class RemoveGoal implements Action {
  readonly type = GoalCollectionActionTypes.RemoveGoal;

  constructor(public payload: number) {}
}
/**
 * Set the acts of a Goal
 */
export class EditGoals implements Action {
  readonly type = GoalCollectionActionTypes.EditGoals;

  constructor(public payload: Goal[]) {}
}
/**
 * Add or edit an act of a goal
 */
export class AddOrEditAct implements Action {
  readonly type = GoalCollectionActionTypes.AddOrEditAct;

  constructor(public payload: { date: Date; goal: Goal }) {}
}

export type GoalCollectionActionsUnion =
  | LoadGoals
  | AddGoal
  | AddGoalToDb
  | AddGoals
  | EditGoal
  | EditGoalDb
  | RemoveGoal
  | EditGoals
  | AddOrEditAct;
