import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidebarComponent, TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 640px)').pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  sidebarCollapsed = false;
  mobileSidenavOpened = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.mobileSidenavOpened = false;
      });
  }

  onToggleSidebar(): void {
    if (this.isMobile()) {
      this.mobileSidenavOpened = !this.mobileSidenavOpened;
      return;
    }

    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
