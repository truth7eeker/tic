import { Component, inject } from '@angular/core';
import { Store } from '../../core/store/store';
import { TicketRowComponent } from './ticket-row/ticket-row.component';
import { ModalComponent } from './modal/modal.component';
import { MainBtnComponent } from '../../shared/ui/main-btn/main-btn.component';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TicketRowComponent, MainBtnComponent, ModalComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  store = inject(Store)
  modalService:ModalService = inject(ModalService)

  ngOnInit() {
    this.store.getTickets()
  }

  openModel() {
    this.modalService.openModal()
  }

}
