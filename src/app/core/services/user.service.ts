import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BASE_URL } from '../consts/api';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });


  updateUser(profileInfo: any) {
  const userId = localStorage.getItem('userId');

    return this.http
      .put(
        `${BASE_URL}/users/${userId}`,
        {
          ...profileInfo,
          birthday: Date.parse(profileInfo.birthday),
        },
        { headers: this.headers }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  getUser(id: string) {
    return this.http
      .get(`${BASE_URL}/users/${id}`, { headers: this.headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(err.error));
        })
      );
  }
}
