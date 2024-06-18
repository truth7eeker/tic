import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { BASE_URL } from '../consts/api';
import { map, catchError, throwError } from 'rxjs';
import { ITicket } from '../models/ticket.model';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  http: HttpClient = inject(HttpClient);
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getTickets() {
    const userId = localStorage.getItem('userId');
    const where = `ownerId='${userId}'`;
    const params = new HttpParams().set('where', where);

    return this.http
      .get(`${BASE_URL}/data/tickets`, {
        headers: this.headers,
        params,
      })
      .pipe(
        map((tickets: any) => {
          return tickets.map((ticket: any) => ({
            ...ticket,
            id: ticket.objectId,
            timestamp: new Date(ticket.timestamp),
          }));
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  updateTicket(ticketInfo: ITicket) {
    const timestamp = Date.parse(ticketInfo.timestamp as any);
    const currentTicketId = localStorage.getItem('currentTicketId');

    return this.http
      .put(
        `${BASE_URL}/data/tickets/${currentTicketId}`,
        { ...ticketInfo, timestamp },
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((ticket: any) => {
          return {
            ...ticket,
            id: ticket.objectId,
            timestamp: Date.parse(ticket.timestamp),
          };
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  addTicket(newTicketInfo: ITicket) {
    const timestamp = Date.parse(newTicketInfo.timestamp as any);
    const userId = localStorage.getItem('userId');

    return this.http
      .post(
        `${BASE_URL}/data/tickets`,
        {
          ...newTicketInfo,
          ownerId: userId,
          timestamp,
        },
        { headers: this.headers }
      )
      .pipe(
        switchMap(async ({ objectId }: any) =>
          this.setUserRelation(objectId).subscribe()
        ),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  setUserRelation(objectId: string) {
    const userId = localStorage.getItem('userId');
   
    return this.http.post(
      `${BASE_URL}/data/tickets/${objectId}/userId`,
      {userId},
      { headers: this.headers }
    );
  }

  deleteTicket() {
    const currentTicketId = localStorage.getItem('currentTicketId');
    
    return this.http.delete(`${BASE_URL}/data/tickets/${currentTicketId}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.error));
      })
    )
  }
}
