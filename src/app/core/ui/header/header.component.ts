import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '../../store/store';

interface ILinks {
  [key: string]: string;
}

const links: ILinks = {
  Home: '/',
  Tickets: '/tickets',
  Profile: '/profile',
  'Log Out': '/login',
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  links = links;
  pages = Object.keys(links);

  token = localStorage.getItem('token')
  store = inject(Store)

  getRouterLink(page: string) {
    if (page === 'Profile') {
      return [this.links[page], localStorage.getItem('userId')]
    } else {
      return [this.links[page]]
    }
  }

  logout(page:string) {
    if (page === 'Log Out') {
      this.store.logout()
    }
  }
}
