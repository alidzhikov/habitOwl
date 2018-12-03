import {
  HabitCollectionActions,
  CollectionApiActions
} from "@howl/habits/actions";
import { Habit } from "../models/habit";

export interface State {
  loaded: boolean;
  loading: boolean;
  habits: Habit[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  habits: []
};

export function reducer(
  state = initialState,
  action:
    | HabitCollectionActions.HabitCollectionActionsUnion
    | CollectionApiActions.CollectionApiActionsUnion
): State {
  switch (action.type) {
    case CollectionApiActions.CollectionApiActionTypes.LoadHabitsSuccess: {
      return {
        loaded: true,
        loading: false,
        habits: action.payload
      };
    }

    case CollectionApiActions.CollectionApiActionTypes.AddHabitSuccess:
    case CollectionApiActions.CollectionApiActionTypes.RemoveHabitFailure: {
      if (state.habits.indexOf(action.payload) > -1) {
        return state;
      }

      return {
        ...state,
        habits: [...state.habits, action.payload]
      };
    }

    case CollectionApiActions.CollectionApiActionTypes.RemoveHabitSuccess:
    case CollectionApiActions.CollectionApiActionTypes.AddHabitFailure: {
      return {
        ...state,
        habits: state.habits.filter(id => id !== action.payload)
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getHabits = (state: State) => state.habits;
