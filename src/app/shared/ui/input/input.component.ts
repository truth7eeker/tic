import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  label = input<string>()
  type = input<string>()
  control = input<any>()
  readonly = input<boolean>()
}
