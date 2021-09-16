import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/_services/post.service';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  isDarkMode!: boolean;
  profileUrl!: string | null;
  themeSub: Subscription = new Subscription();
  searchSubscription: Subscription = new Subscription();
  username!: string | null;
  profileLink!: string;
  searchForm!: FormGroup;
  searchedPosts!: Thumbnail[];
  @ViewChild('img', { static: true }) image!: ElementRef;
  @ViewChild('newImg', { static: true }) newImage!: ElementRef;
  @Input() displayNav = true;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private postService: PostService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );

    this.username = this.authService.getUsername();
    this.profileLink = `/profile/${this.username}`;

    this.profileUrl = this.authService.getProfileUrl();
    this.themeService.getTheme();

    this.searchForm = new FormGroup({
      query: new FormControl(null),
    });
  }

  get query() {
    return this.searchForm.controls.query;
  }

  ngAfterViewInit(): void {
    this.searchSubscription = this.query.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        console.log(val);
        this.postService
          .getPosts({ fileType: '', searchQuery: val })
          .subscribe((res) => {
            this.searchedPosts = res.posts;
          });
      });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  clearSearch() {
    this.query.reset();
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
