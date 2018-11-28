import {
    HabitsPageActions,
    CollectionApiActions,
  } from '@howl/habits/actions';
  
  export interface State {
    loaded: boolean;
    loading: boolean;
    ids: string[];
  }
  
  const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
  };
  
  export function reducer(
    state = initialState,
    action:
      | HabitsPageActions.HabitsPageActionsUnion
      | CollectionApiActions.CollectionApiActionsUnion
  ): State {
    switch (action.type) {
      
      case CollectionApiActions.CollectionApiActionTypes.LoadHabitsSuccess: {
        return {
          loaded: true,
          loading: false,
          ids: action.payload.map(Habit => Habit.id.toString()),
        };
      }
  
      case CollectionApiActions.CollectionApiActionTypes.AddHabitSuccess:
      case CollectionApiActions.CollectionApiActionTypes.RemoveHabitFailure: {
        if (state.ids.indexOf(action.payload.id.toString()) > -1) {
          return state;
        }
  
        return {
          ...state,
          ids: [...state.ids, action.payload.id.toString()],
        };
      }
  
      case CollectionApiActions.CollectionApiActionTypes.RemoveHabitSuccess:
      case CollectionApiActions.CollectionApiActionTypes.AddHabitFailure: {
        return {
          ...state,
          ids: state.ids.filter(id => id !== action.payload.id.toString()),
        };
      }
  
      default: {
        return state;
      }
    }
  }
  
  export const getLoaded = (state: State) => state.loaded;
  
  export const getLoading = (state: State) => state.loading;
  
  export const getIds = (state: State) => state.ids;
  