import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions } from "@ngrx/effects";
import * as fromGoals from "@howl/goals/reducers";
@Injectable()
export class GoalEffects {
  constructor(
    private actions$: Actions,
    //private habitsHttpService: HabitHttpService,
    private router: Router,
    private store: Store<fromGoals.State>
  ) {}
}
