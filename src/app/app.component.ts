import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/ui/header/header.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NgHttpLoaderModule,
    BreadcrumbComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router: Router = inject(Router);
  currentRoute = signal<string>('/login')

  ngOnInit() {
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? this.currentRoute.set(event.url) : null;
    });
  }
}
