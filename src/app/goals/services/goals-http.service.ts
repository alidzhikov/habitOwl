import { Injectable } from "@angular/core";
import * as fromAuth from "@howl/auth/reducers";
import { map } from "rxjs/operators";
import { of } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Store, select } from "@ngrx/store";

@Injectable()
export class GoalsHttpService{

    token: string | undefined;
    headers = { headers: new HttpHeaders({
      "Content-type": "application/json",
      Authorization: "Bearer " + this.token
    })};

    constructor(public http: HttpClient, private store: Store<fromAuth.State>) {}
    
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
}