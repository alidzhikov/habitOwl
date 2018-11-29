import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Habit } from "../models/habit";
import { environment } from "src/environments/environment";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "@howl/auth/reducers";
import { map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable() //try with provided in root
export class HabitsHttpService {
  token: string | undefined;
  httpAuthHeader = new HttpHeaders({
    "Content-type": "application/json",
    Authorization: "Bearer " + this.token
  });

  constructor(public http: HttpClient, private store: Store<fromAuth.State>) {
    this.store.pipe(select(fromAuth.getToken)).subscribe(token => {
      if (token && token.length > 0) {
        this.httpAuthHeader = new HttpHeaders({
          "Content-type": "application/json",
          Authorization: "Bearer " + token
        });
        this.token = token;
      }
    });
  }

  fetchAllHabits() {
    return this.getToken().pipe(
      mergeMap(() =>
        this.http.get<Habit[]>(environment.dataURL + "/habits", {
          headers: this.httpAuthHeader
        })
      )
    );
  }

  getToken() {
    if (!this.token) {
      return this.store.pipe(select(fromAuth.getToken)).pipe(
        map(token => {
          token && token.length > 0
            ? (this.httpAuthHeader = new HttpHeaders({
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
}
