import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
})
export class BottomNavbarComponent implements OnInit, OnDestroy {
  className!: string;
  isDarkmode!: boolean;
  themeSub: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkmode = isDark;
        // Todo: make it refresh active color
        isDark ? (this.className = 'active-dark') : (this.className = 'active');
      }
    );

    this.themeService.getTheme();
  }

  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }
}
