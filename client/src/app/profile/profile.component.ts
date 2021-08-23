import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        });
      } else {
        this.router.navigate(['404']);
      }
    });
  }
}
