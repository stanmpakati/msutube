import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { ThemeService } from 'src/app/_services/theme.service';
import { timeAgo } from 'src/app/_services/time-ago.service';
import { environment } from 'src/environments/environment';

const cloudinary = environment.cloudinary;

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit, OnDestroy {
  @Input() thumbnailData!: Thumbnail;
  timeElapsed!: string;
  owner!: string;
  themeSub: Subscription = new Subscription();
  isDarkMode!: boolean;
  isLoading!: boolean;

  constructor(private router: Router, private themeService: ThemeService) {}
  thumnailUrl!: string;

  ngOnInit(): void {
    // Calculate time submited relative to today
    this.timeElapsed = timeAgo(this.thumbnailData.createdAt);

    if (this.thumbnailData.thumb_public_id)
      this.thumnailUrl = cloudinary + this.thumbnailData.thumb_public_id;
    else if (this.thumbnailData.thumbnailUrl)
      this.thumnailUrl = this.thumbnailData.thumbnailUrl;

    // Determine how many authors there are
    if (this.thumbnailData.owners.length > 1) this.owner = 'Various Owners';
    else this.owner = this.thumbnailData.owners[0];

    // To register theme changes
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );
    this.themeService.getTheme();
  }

  navigateToPage() {
    this.router.navigate(['/video', this.thumbnailData._id]);
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }
}
