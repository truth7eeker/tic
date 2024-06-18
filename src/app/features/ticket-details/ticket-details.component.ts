import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../core/store/store';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/ui/input/input.component';
import { MainBtnComponent } from '../../shared/ui/main-btn/main-btn.component';
  

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, MainBtnComponent],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent {
  store = inject(Store);
  currTicketId = localStorage.getItem('currentTicketId')
  currTicketTitle= localStorage.getItem('currentTicketTitle')
  currTicketTimestamp = localStorage.getItem('currentTicketTimestamp')

  ticketInfo = new FormGroup({
    title: new FormControl(
      this.store.currentTicket().title || this.currTicketTitle,
      Validators.required
    ),
    timestamp: new FormControl(
      new DatePipe('en-En').transform(
        this.store.currentTicket().timestamp,
        'YYYY-MM-dd HH:mm'
      ) || this.currTicketTimestamp,
      Validators.required 
    ),
    id: new FormControl(this.store.currentTicket().id || this.currTicketId, Validators.required) ,
  });

  saveTicket() {
    if (this.ticketInfo.valid) {
      this.store.updateTicket(this.ticketInfo.value)
    }  
  }
 
  deleteTicket() {
    this.store.deleteTicket()
  }
 
}
