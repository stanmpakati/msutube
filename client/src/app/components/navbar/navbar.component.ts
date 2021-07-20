import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ImageService } from 'src/app/_services/image.service';
import { ThemeService } from 'src/app/_services/theme.service';

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
  user!: User;
  @ViewChild('img', { static: true }) image!: ElementRef;
  @ViewChild('newImg', { static: true }) newImage!: ElementRef;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );

    this.authService.loginUser(
      {
        email: 'stanmp@stan.com',
        username: 'stanmp',
        password: 'Test123.',
      },
      '/'
    );
    // this.imgCache = this.imageService
    //   .getImage(this.user.profilePicUrl)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.image.nativeElement.src = this.user.profilePicUrl;
    //   });

    this.profileUrl = this.authService.getProfileUrl();
    this.themeService.getTheme();
    console.log('purl', this.profileUrl);

    // this.user = {
    //   username: 'stanmpakati',
    //   email: 'stan@stan.com',
    //   profilePicUrl:
    //     'http://localhost:5000/_uploads/profile-pictures/pp-1626448377219-blob',
    // };

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
  }
}
