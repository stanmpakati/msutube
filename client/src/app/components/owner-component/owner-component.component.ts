import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-owner-component',
  templateUrl: './owner-component.component.html',
  styleUrls: ['./owner-component.component.scss'],
})
export class OwnerComponentComponent implements OnInit {
  @Input() username!: string;
  userDetails!: {
    first: string;
    last: string;
    username: string;
    profilePicUrl: string | null | undefined;
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Get user details from backend
    this.userService.getUser(this.username).subscribe((userData) => {
      const user = userData.user;
      this.userDetails = {
        ...user.name,
        username: this.username,
        profilePicUrl: user.profilePicUrl,
      };
    });
  }

  navigateToProfile() {
    this.router.navigateByUrl(`profile/${this.username}`);
  }
}
