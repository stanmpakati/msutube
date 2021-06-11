import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode!: boolean;
  private themeListener = new Subject<boolean>();

  constructor() {}

  get getIsDarkMode() {
    return this.isDarkMode;
  }

  get themeStatusListener() {
    return this.themeListener.asObservable();
  }

  getTheme() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark' ? true : false;
    this.themeListener.next(this.isDarkMode);
  }

  toggleTheme(val: boolean) {
    this.isDarkMode = val;
    localStorage.setItem('theme', val ? 'dark' : 'light');
    this.themeListener.next(this.isDarkMode);
    console.log('hit' + val);
  }
}
