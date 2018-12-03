import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";
import * as fromHabits from "@howl/habits/reducers/habits.reducer";
import * as fromRoot from "@howl/reducers";

export interface HabitsState {
  habits: fromHabits.State;
}

export interface State extends fromRoot.State {
  habits: HabitsState;
}

export const reducers: ActionReducerMap<HabitsState, any> = {
  habits: fromHabits.reducer
};
/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `Habits` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.HabitsState$ = state$.pipe(select(getHabitsState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getHabitsState = createFeatureSelector<State, HabitsState>(
  "habits"
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getHabitEntitiesState = createSelector(
  getHabitsState,
  state => state.habits
);
/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getHabitIds,
  selectEntities: getHabitEntities,
  selectAll: getAllHabits,
  selectTotal: getTotalHabits
} = fromHabits.adapter.getSelectors(getHabitEntitiesState);

export const getCollectionState = createSelector(
  getHabitsState,
  (state: HabitsState) => state.habits
);
