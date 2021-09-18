import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Details } from 'src/app/_models/details.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() details!: Details;
  isLiked = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Todo: check if liked if logged in

    if (this.authService.getUserId())
      this.postService
        .getIsLiked(this.details._id)
        .subscribe((res) => (this.isLiked = res.isLiked));
  }

  likeVideo() {
    this.isLiked = !this.isLiked;
    this.postService
      .likePost(this.details._id, !this.isLiked)
      .subscribe((res) => {
        this.isLiked = res.isLiked;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      data: this.details.title,
    });

    dialogRef.afterClosed().subscribe();
  }
}

/**
 * share buttons pop up dialog
 */

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
})
export class ShareDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string
  ) {}
}
