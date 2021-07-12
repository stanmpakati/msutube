import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  themeSub: Subscription = new Subscription();

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );
    this.themeService.getTheme();
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }

  toggleThemeSelection() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme(this.isDarkMode);
  }

  logout() {
    this.authService.logout();
  }
}
