import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
})
export class BottomNavbarComponent implements OnInit, OnDestroy {
  className!: string;
  isDarkmode!: boolean;
  profileRoute!: string;
  themeSub: Subscription = new Subscription();

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkmode = isDark;
        // Todo: make it refresh active color
        isDark ? (this.className = 'active-dark') : (this.className = 'active');
      }
    );

    this.themeService.getTheme();

    // Get username
    this.authService.getUsername()
      ? (this.profileRoute = `/profile/${this.authService.getUsername()}`)
      : '/auth/login';
  }

  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }
}
