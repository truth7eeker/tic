import { Injectable, inject, signal} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'

import { BASE_URL } from '../consts/api';
import { catchError, throwError, map } from 'rxjs'
import { ILoginData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private http: HttpClient = inject(HttpClient)
   private headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
   })

   public authErr = signal('')

  constructor() { }

  login(loginData: ILoginData) {
    return this.http.post(`${BASE_URL}/users/login`, loginData, {headers: this.headers})
    .pipe(
      map((res:any) => {
        const user = {
          id: res.objectId,
          login: res.login,
          firstname: res.firstname,
          lastname: res.lastname,
          birthday: new Date(res.birthday),
          city: res.city,
          token: res['user-token']
        }
        return user
      }),
      catchError((err: HttpErrorResponse) => {
        this.authErr.set(err.error.message)
        return throwError(() => new Error(err.error))
     })
    )
  }

}
