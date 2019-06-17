import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Habit } from "../models/habit";
import { CollectionApiActions, HabitCollectionActions } from "../actions";
import { Act } from "../models/act";
import * as moment from "moment";

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Habit> {
  ids: string[];
  entities: { [id: string]: Habit };
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Habit> = createEntityAdapter<Habit>(); //sort comparer false and sme other params

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  ids: [],
  entities: []
});
//https://stackblitz.com/edit/angular-nuiviw?file=src%2Fapp%2Fapp.component.css
export function reducer(
  state = initialState,
  action: HabitCollectionActions.HabitCollectionActionsUnion
): State {
  switch (action.type) {
    case HabitCollectionActions.HabitCollectionActionTypes.EditHabit: {
      return adapter.upsertOne(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.EditHabits: {
      return adapter.upsertMany(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.AddHabits: {
      return adapter.addMany(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.AddHabit: {
      return adapter.addOne(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.RemoveHabit: {
      return adapter.removeOne(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.AddAct: {
      let habit = state.entities[action.payload.habitId].clone();
      if (habit.acts) {
        habit.acts = [...habit.acts, action.payload];      
      } else {
        habit.acts = [action.payload];
      }
      return adapter.upsertOne(habit, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.RemoveAct: {
      let habit = state.entities[action.payload.habitId].clone();
      let actIndex = habit.acts.findIndex(act => act.id == action.payload.id);
      if (habit.acts) {
        habit.acts.splice(actIndex, 1);      
      }
      return adapter.upsertOne(habit, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.DragSort: {
      
    }
    //sort drag and drop
    //sort from local storage or db 
    default: {
      return state;
    }
  }
}
