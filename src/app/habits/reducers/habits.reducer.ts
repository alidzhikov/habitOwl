import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Habit } from "../models/habit";
import {
  HabitsApiActions,
  HabitActions,
  CollectionApiActions,
  HabitsPageActions
} from "../actions";
import { HabitCategory, HabitCategoryType } from "../models/habit-category";
import {
  DesiredFrequency,
  DesiredFrequencyType
} from "../models/desired-frequency";

let habits = [
  new Habit(
    1,
    "Workout",
    "5 times a week",
    new HabitCategory(HabitCategoryType.Health),
    new DesiredFrequency(DesiredFrequencyType.ThreeTimesAWeek)
  ),
  new Habit(
    2,
    "Read",
    "its nice",
    new HabitCategory(HabitCategoryType.PersonalDevelopment),
    new DesiredFrequency(DesiredFrequencyType.Everyday)
  ),
  new Habit(
    3,
    "Dance",
    "5 times a week",
    new HabitCategory(HabitCategoryType.Health),
    new DesiredFrequency(DesiredFrequencyType.OnceAWeek)
  ),
  new Habit(
    4,
    "Jump",
    "12 times a day",
    new HabitCategory(HabitCategoryType.Work),
    new DesiredFrequency(DesiredFrequencyType.ThreeTimesAWeek)
  ),
  new Habit(
    5,
    "Cry",
    "0.2 times a week",
    new HabitCategory(HabitCategoryType.Spirituality),
    new DesiredFrequency(DesiredFrequencyType.OnceAMonth)
  )
];

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
  ids: habits.map(habit => habit.id.toString()),
  entities: habits
});

export function reducer(
  state = initialState,
  action:
    | HabitsApiActions.HabitsApiActionsUnion
    //| HabitActions.HabitActionsUnion
    | HabitsPageActions.HabitsPageActionsUnion
    | CollectionApiActions.CollectionApiActionsUnion
): State {
  switch (action.type) {
    case HabitsApiActions.HabitsApiActionTypes.SearchSuccess:
    case CollectionApiActions.CollectionApiActionTypes.LoadHabitsSuccess: {
      /**
       * The addMany function provided by the created adapter
       * adds many records to the entity dictionary
       * and returns a new state including those records. If
       * the collection is to be sorted, the adapter will
       * sort each record upon entry into the sorted array.
       */
      return adapter.addMany(action.payload, state);
    }
    case HabitsPageActions.HabitsPageActionTypes.AddHabits: {
      return adapter.addMany(action.payload, state);
    }
    // case HabitActions.HabitActionTypes.LoadHabit: {
    //   /**
    //    * The addOne function provided by the created adapter
    //    * adds one record to the entity dictionary
    //    * and returns a new state including that records if it doesn't
    //    * exist already. If the collection is to be sorted, the adapter will
    //    * insert the new record into the sorted array.
    //    */
    //   return adapter.addOne(action.payload, state);
    // }

    // case HabitsPageActions.HabitsPageActionsUnion.SelectHabit: {
    //   return {
    //     ...state,
    //     selectedHabitId: action.payload,
    //   };
    // }

    default: {
      return state;
    }
  }
}
