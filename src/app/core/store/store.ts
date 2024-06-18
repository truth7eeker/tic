import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { IUser } from '../models/user.model';
import { ITicket } from '../models/ticket.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TicketService } from '../services/ticket.service';
import { inject } from '@angular/core';
import { ILoginData } from '../models/user.model';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface IStore {
  user: IUser;
  tickets: ITicket[];
  currentTicket: ITicket;
}

const initialState: IStore = {
  user: {
    id: '',
    login: '',
    firstname: '',
    lastname: '',
    birthday: new Date(),
    city: '',
    token: '',
  },
  tickets: [],
  currentTicket: {
    id: '',
    title: '',
    timestamp: new Date(),
  },
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      router = inject(Router),
      userService = inject(UserService),
      ticketService = inject(TicketService),
      toastrService = inject(ToastrService)
    ) => ({
      // user-realeted methods
      login(loginData: ILoginData) {
        authService.login(loginData).subscribe((user: IUser) => {
          localStorage.setItem('token', user.token!);
          localStorage.setItem('userId', user.id);
          router.navigate([AppRoutes.MAIN]);
          patchState(store, { user });
        });
      },

      logout() {
        localStorage.removeItem('token');
        patchState(store, initialState);
      },

      updateUser(profileInfo: Partial<IUser>) {
        userService.updateUser(profileInfo).subscribe((updatedUser: any) => {
          patchState(store, { user: updatedUser });
          toastrService.success('Profile updated')
        });
      },

      getUser() {
        const userId = localStorage.getItem('userId') || '';
        userService.getUser(userId).subscribe((user: any) => {
          patchState(store, { user });
        });
      },

      // ticket-related methods
      getTickets() {
        ticketService.getTickets().subscribe((tickets: any) => {
          patchState(store, { tickets });
        });
      },

      openTicket(ticket: ITicket) {
        patchState(store, { currentTicket: ticket });
        localStorage.setItem('currentTicketId', ticket.id);
        localStorage.setItem('currentTicketTitle', ticket.title);
        localStorage.setItem(
          'currentTicketTimestamp',
          ticket.timestamp.toString()
        );
      },

      updateTicket(ticketInfo: any) {
        ticketService.updateTicket(ticketInfo).subscribe((ticket: any) => {
          patchState(store, { currentTicket: ticket });
          toastrService.success('Ticket updated')
        });
      },

      addTicket(newTicketInfo: ITicket) {
        ticketService
          .addTicket(newTicketInfo)
          .pipe(switchMap(async () => this.getTickets()))
          .subscribe(() => {
          toastrService.success('New ticket added')

          });
      },

      deleteTicket() {
        ticketService.deleteTicket().subscribe(() => {
          patchState(store, { currentTicket: initialState.currentTicket });
          localStorage.removeItem('currentTicketId');
          localStorage.removeItem('currentTicketTitle');
          localStorage.removeItem('currentTicketTimestamp');
          router.navigate(['/home']);
          toastrService.success('Successfully deleted')
        });
      },
    })
  )
);
