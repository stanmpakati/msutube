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
  videos: string[] = [];
  pics: string[] = [];
  audio: string[] = [];

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
          this.user = { ...res.user };
          console.log(this.user);

          res.user.uploadedPosts?.forEach((val) => {
            if (val.fileType.includes('video')) this.videos.push(val._id);
            else if (val.fileType.includes('audio')) this.audio.push(val._id);
            if (val.fileType.includes('image')) this.pics.push(val._id);
            this.isLoading = false;
          });
        });
      } else {
        this.router.navigate(['404']);
      }
    });
  }
}
