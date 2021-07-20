import { Component, OnInit } from '@angular/core';
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

  constructor(
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.userService.getUser('stanmp').subscribe((res) => {
      console.log(res.message);
      this.user = { ...res.user };
      console.log(this.user);
    });

    this.themeService.themeStatusListener.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
}
