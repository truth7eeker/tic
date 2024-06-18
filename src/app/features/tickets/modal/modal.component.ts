import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { MainBtnComponent } from '../../../shared/ui/main-btn/main-btn.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../core/services/modal.service';
import { Store } from '../../../core/store/store';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, MainBtnComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  store = inject(Store);
  modalService: ModalService = inject(ModalService);

  newTicket = new FormGroup({
    title: new FormControl('', Validators.required),
    timestamp: new FormControl('', Validators.required),
  });

  saveNewTicket() {
    if (this.newTicket.valid) {
      this.store.addTicket(this.newTicket.value as any);
      this.modalService.closeModal();
    }
  }
}
