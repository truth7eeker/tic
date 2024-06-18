import { Component, input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faUnlock} from '@fortawesome/free-solid-svg-icons';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  label = input<string>()
  type = input<string>()
  control = input<FormControl>()

  faLock = faLock
  faUnlock = faUnlock

  isFieldOpen = false

  @ViewChild('password') passwordInput!: ElementRef;

  togglePassword() {
      this.isFieldOpen = !this.isFieldOpen

      const inputType = this.passwordInput.nativeElement.type
      
      if (inputType === 'text') {
        this.passwordInput.nativeElement.type = 'password'
      } else {
        this.passwordInput.nativeElement.type = 'text'
      }
  }
}
