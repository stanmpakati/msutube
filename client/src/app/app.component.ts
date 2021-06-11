import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front';
  isDarkMode!: boolean;
  themeSub: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getTheme();
    this.themeService.themeStatusListener.subscribe(
      (isDark) => (this.isDarkMode = isDark)
    );
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }
}
