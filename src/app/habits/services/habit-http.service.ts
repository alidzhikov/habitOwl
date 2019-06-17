import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Habit } from "../models/habit";
import { environment } from "src/environments/environment";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "@howl/auth/reducers";
import { map, mergeMap, tap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Act } from "../models/act";
import { DesiredFrequency } from "../models/desired-frequency";
import { HabitCategory, HabitCategoryType } from "../models/habit-category";

@Injectable() //try with provided in root
export class HabitHttpService {
  token: string | undefined;
  headers = { headers: new HttpHeaders({
    "Content-type": "application/json",
    Authorization: "Bearer " + this.token
  })};

  constructor(public http: HttpClient, private store: Store<fromAuth.State>) {}

  fetchAllHabits(): Observable<Habit[]> {
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.get<{ count: number; habits: any[] }>(
          environment.dataURL + "/habits",
          this.headers
        )
      ),
      map(res => res.habits.map(habit => this.mapHabit(habit)))
    );
  }

  fetchAllActs() {
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.get<{ count: number; acts: any[] }>(
          environment.dataURL + "/acts",
          this.headers
        )
      ),
      map(res => res.acts.map(act => this.mapAct(act)))
    );
  }

  createHabit(habit: Habit): Observable<Habit>{
    debugger;
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.post<{message:string, createdHabit:Habit}>(
          environment.dataURL + "/habits",
          habit.stringifyForDb(),
          this.headers
        )
      ),
      map(res => this.mapHabit(res.createdHabit))
    );
  }

  updateHabit(habit: Habit): Observable<Habit>{
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.patch<{message: string, updatedHabit: Habit}>(
          environment.dataURL + "/habits/" + habit.id,
          habit.stringifyForDb(),
          this.headers
        )
      ),
      map(res => this.mapHabit(res.updatedHabit))
    );
  }

  deleteHabit(habitId: number) {
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.delete<{message: string}>(
          environment.dataURL + "/habits/" + habitId,
          this.headers
        )
      )
    );
  }

  createAct(act: Act){
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.post<{message:string, createdAct:Act}>(
          environment.dataURL + "/acts",
          JSON.stringify(act),
          this.headers
        )
      ),
      map(res => this.mapAct(res.createdAct))
    );
  }

  deleteAct(actId: number) {
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.delete<{message: string}>(
          environment.dataURL + "/acts/" + actId,
          this.headers
        )
      )
    );
  }

  getToken() {
    if (!this.token) {
      return this.store.pipe(select(fromAuth.getToken)).pipe(
        map(token => {
          token && token.length > 0
            ? (this.headers.headers = new HttpHeaders({
                "Content-type": "application/json",
                Authorization: "Bearer " + token
              }))
            : undefined;
          return token;
        })
      );
    }
    return of(this.token);
  }

  mapHabit(habit:any){
    return new Habit(
      habit.name,
      habit.comment,
      new HabitCategory(habit.category),
      new DesiredFrequency(habit.desiredFrequency),
      [],
      habit._id,
      habit.createdAt 
    );
  }

  mapAct(act: any){
    return new Act(act.habitId, act.date, act._id, act.createdAt);
  }
}
