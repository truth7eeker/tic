import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../core/store/store';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { IUser } from '../../core/models/user.model';
import { MainBtnComponent } from '../../shared/ui/main-btn/main-btn.component';
import { InputComponent } from '../../shared/ui/input/input.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, MainBtnComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  store = inject(Store);

  profileInfo = new FormGroup({
    id: new FormControl(this.store.user().id, Validators.required),
    login: new FormControl(this.store.user().login, Validators.required),
    firstname: new FormControl(
      this.store.user().firstname,
      Validators.required
    ),
    lastname: new FormControl(this.store.user().lastname, Validators.required),
    birthday: new FormControl(
      new DatePipe('en-US').transform(this.store.user().birthday, 'YYYY-MM-dd'),
      Validators.required
    ),
    city: new FormControl(this.store.user().city, Validators.required),
  });
  
  ngOnInit() {
    this.store.getUser();
  }

  onSubmit() {
    if (this.profileInfo.valid) {
      this.store.updateUser(this.profileInfo.value as Partial<IUser>);
    }
  }
}
