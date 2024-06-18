import { Component } from '@angular/core';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
}
