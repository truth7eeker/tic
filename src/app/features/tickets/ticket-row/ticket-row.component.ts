import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ITicket } from '../../../core/models/ticket.model';
import { Store } from '../../../core/store/store';


@Component({
  selector: 'app-ticket-row',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-row.component.html',
  styleUrl: './ticket-row.component.scss',
})
export class TicketRowComponent {
  ticket = input<ITicket>();

  store = inject(Store);

  openTicket() {
    this.store.openTicket(this.ticket()!);
  }

}
