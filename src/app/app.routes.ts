import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export enum AppRoutes {
  MAIN = '',
  LOGIN = 'login',
  PROFILE = 'profile/:id',
  TICKETS = 'tickets',
  TICKET = 'ticket/:id',
}

export const routes: Routes = [
  {
    path: AppRoutes.MAIN,
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
      canActivate: [authGuard],
      data: { breadcrumb: 'Home' }
  },
  {
    path: AppRoutes.PROFILE,
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
      canActivate: [authGuard],
      data: { breadcrumb: 'Profile' },
      pathMatch: 'full'
  },
  {
    path: AppRoutes.LOGIN,
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
      data: { breadcrumb: { skip: true } },
      pathMatch: 'full'

  },
  {
    path: AppRoutes.TICKETS,
    loadComponent: () =>
      import('./features/tickets/tickets.component').then(
        (c) => c.TicketsComponent
      ),
      canActivate: [authGuard],
      data: { breadcrumb: 'Tickets' }
  },
  {
    path: AppRoutes.TICKET,
    loadComponent: () =>
      import('./features/ticket-details/ticket-details.component').then(
        (c) => c.TicketDetailsComponent
      ),
      canActivate: [authGuard],
      data: { breadcrumb: 'Ticket' }
  },
  {
    path: '**',
    redirectTo: AppRoutes.MAIN,
 },
];
