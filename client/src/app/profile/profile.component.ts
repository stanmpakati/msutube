import { Component, OnInit } from '@angular/core';
import { FullUser } from '../_models/user-details';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: FullUser;
  isDarkMode = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser('stan').subscribe((res) => {
      console.log(res.message);
      this.user = { ...res.user };
      console.log(this.user);
    });
  }
}
