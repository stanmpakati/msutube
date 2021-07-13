import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(
    private themeService: ThemeService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry
      .addSvgIcon(
        'instagram',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg'
        )
      )
      .addSvgIcon(
        'twitter',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg'
        )
      )
      .addSvgIcon(
        'whatsapp',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/whatsapp.svg'
        )
      )
      .addSvgIcon(
        'facebook',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg'
        )
      );
  }

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
