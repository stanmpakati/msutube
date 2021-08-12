import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ImageService } from 'src/app/_services/image.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  profileUrl!: string | null;
  themeSub: Subscription = new Subscription();
  imgCache: Subscription = new Subscription();
  username!: string | null;
  @ViewChild('img', { static: true }) image!: ElementRef;
  @ViewChild('newImg', { static: true }) newImage!: ElementRef;
  @Input() displayNav = true;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private imageService: ImageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );

    this.username = this.authService.getUsername();

    // this.imgCache = this.imageService
    //   .getImage(this.user.profilePicUrl)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.image.nativeElement.src = this.user.profilePicUrl;
    //   });

    this.profileUrl = this.authService.getProfileUrl();
    this.themeService.getTheme();

    // this.imageService.cacheUrls = [this.user.profilePicUrl];
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
    this.imgCache.unsubscribe();
  }

  toggleThemeSelection() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme(this.isDarkMode);
  }

  logout() {
    this.authService.logout();

    // Notify user with a snackbar
    this._snackBar.open('You have been logged out', 'close', {
      duration: 3000,
    });
  }
}
