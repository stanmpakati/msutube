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
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        console.log(`isdark: ${isDark}`);
        this.isDarkMode = isDark;
      }
    );
    this.themeService.getTheme();
    console.log(`isdarkmode: ${this.isDarkMode}`);
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }
}
