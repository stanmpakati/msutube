import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { values } from 'lodash';
import { FullUser } from '../_models/user-details';
import { ThemeService } from '../_services/theme.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: FullUser;
  isDarkMode!: boolean;
  isLoading = true;
  owned: { [key: string]: string[] } = {
    videos: [],
    pics: [],
    audio: [],
  };
  contributed: { [key: string]: string[] } = {
    videos: [],
    pics: [],
    audio: [],
  };

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Theme stuff
    this.themeService.themeStatusListener.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });

    // Getting user profile stuff
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userService.getUser(id).subscribe((res) => {
          // If user not found
          if (!res.user) this.router.navigate(['404']);

          this.user = { ...res.user };
          console.log(this.user);

          res.user.uploadedPosts?.forEach((val) => {
            if (val.fileType.includes('video')) this.owned.videos.push(val._id);
            else if (val.fileType.includes('audio'))
              this.owned.audio.push(val._id);
            if (val.fileType.includes('image')) this.owned.pics.push(val._id);
          });

          res.user.contributedPosts?.forEach((val) => {
            if (val.fileType.includes('video'))
              this.contributed.videos.push(val._id);
            else if (val.fileType.includes('audio'))
              this.contributed.audio.push(val._id);
            if (val.fileType.includes('image'))
              this.contributed.pics.push(val._id);
          });
          this.isLoading = false;
        });
      } else {
        this.router.navigate(['404']);
      }
    });
  }
}
