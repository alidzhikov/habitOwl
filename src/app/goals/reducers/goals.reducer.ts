import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Goal } from "../models/goal";
import { GoalCollectionActions } from "../actions";
import * as moment from "moment";

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Goal> {
  ids: string[];
  entities: { [id: string]: Goal };
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Goal> = createEntityAdapter<Goal>(); //sort comparer false and sme other params

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
  action: GoalCollectionActions.GoalCollectionActionsUnion
): State {
  switch (action.type) {
    case GoalCollectionActions.GoalCollectionActionTypes.EditGoal: {
      return adapter.upsertOne(action.payload, state);
    }
    case GoalCollectionActions.GoalCollectionActionTypes.EditGoals: {
      return adapter.upsertMany(action.payload, state);
    }
    case GoalCollectionActions.GoalCollectionActionTypes.AddGoals: {
      return adapter.addMany(action.payload, state);
    }
    case GoalCollectionActions.GoalCollectionActionTypes.AddGoal: {
      return adapter.addOne(action.payload, state);
    }
    case GoalCollectionActions.GoalCollectionActionTypes.RemoveGoal: {
      return adapter.removeOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
