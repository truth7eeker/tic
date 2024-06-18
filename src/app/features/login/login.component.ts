import { Component, inject } from '@angular/core';
import { InputComponent } from './input/input.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Store } from '../../core/store/store';
import { ILoginData } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { MainBtnComponent } from '../../shared/ui/main-btn/main-btn.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, MainBtnComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  store = inject(Store);
  authService: AuthService = inject(AuthService);

  loginData = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginUser() {
    if (this.loginData.valid) {
      this.store.login(this.loginData.value as ILoginData);
    }
  }
}
