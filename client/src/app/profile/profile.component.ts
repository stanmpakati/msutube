import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { FullUser } from '../_models/user-details';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser('stan').subscribe((res) => {
      console.log(res.message);
      this.user = res.user;
    });
  }
}
