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

export function reducer(
  state = initialState,
  action:
    | HabitCollectionActions.HabitCollectionActionsUnion
    | CollectionApiActions.CollectionApiActionsUnion
): State {
  switch (action.type) {
    case CollectionApiActions.CollectionApiActionTypes.LoadHabitsSuccess: {
      return adapter.addMany(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.EditHabits: {
      return this.adapter.upsertMany(action.payload);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.AddHabits: {
      return adapter.addMany(action.payload, state);
    }
    case HabitCollectionActions.HabitCollectionActionTypes.AddOrEditAct: {
      let copiedState = JSON.parse(JSON.stringify(state));
      let act = new Act(action.payload.habit.id, action.payload.date);
      let habit = copiedState.entities[action.payload.habit.id];
      if (habit.acts) {
        let actIndex = habit.acts.findIndex(act =>
          moment(act.date)
            .startOf("day")
            .isSame(moment(action.payload.date))
        );
        if (actIndex > -1) {
          habit.acts.splice(actIndex, 1);
        } else {
          habit.acts = [...habit.acts, act];
        }
      } else {
        habit.acts = [act];
      }
      return copiedState;
    }
    default: {
      return state;
    }
  }
}
