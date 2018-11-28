import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, User } from '@howl/auth/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jsonHeader = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(public http: HttpClient) {}

  login({ email, password }: Credentials): Observable<User> {
    /**
     * make a request to node and get token
     * message for the login form.
     */

    return this.http
      .post(
        environment.dataURL + '/user/login',
        JSON.stringify({ email: email, password: password }),
        { headers: this.jsonHeader }
      )
      .pipe(
        map((res: any) => {
          return { email: email, token: res.token };
        })
      );
  }

  logout() {
    return of(true);
  }
}
