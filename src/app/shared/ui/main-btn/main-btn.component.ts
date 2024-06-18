import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-main-btn',
  standalone: true,
  imports: [],
  templateUrl: './main-btn.component.html',
  styleUrl: './main-btn.component.scss',
})
export class MainBtnComponent {
  title = input<string>();
  type = input<string>();

  handleClick = output<MouseEvent>();

  click(event: MouseEvent) {
    this.handleClick.emit(event);
  }
}
