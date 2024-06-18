import { Injectable, signal, inject } from '@angular/core';
import { Store } from '../store/store';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  store = inject(Store)
  isOpen = signal<boolean>(false)

  openModal() {
    this.isOpen.set(true)
  }

  closeModal() {
    this.isOpen.set(false)
  }
}
