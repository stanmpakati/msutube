import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserService } from '../_services/user.service';
import { DetailsComponent } from './details/details.component';
import { ContributersFormComponent } from './contributers-form/contributers-form.component';
import { ThemeService } from '../_services/theme.service';
import { Subscription } from 'rxjs';
import { UploadService } from '../_services/upload.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  linksForm!: FormGroup;
  @ViewChild('detailsComponent', { static: false })
  detailsComponent!: DetailsComponent;

  @ViewChild('contributersFormComponent', { static: false })
  contributersFormComponent!: ContributersFormComponent;
  isDarkMode!: boolean;
  ifFileUploadingListener = new Subscription();
  fileUploading!: boolean;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private uploadService: UploadService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.getIsDarkMode;

    this.ifFileUploadingListener = this.uploadService.isFileUploading.subscribe(
      (isUploading) => (this.fileUploading = isUploading)
    );
    console.log('uploading' + this.fileUploading);
  }

  ngOnDestroy() {
    this.ifFileUploadingListener.unsubscribe();
  }

  get detailsForm() {
    return this.detailsComponent?.detailsForm;
  }

  get contributersForm() {
    return this.contributersFormComponent?.contributesForm;
  }

  checkIfFileIsUploading() {
    console.log('details file upload ' + this.fileUploading);

    // Throw error if there is no file uploading
    if (!this.fileUploading) {
      const dialogRef = this.dialog.open(NoFileDialogComponent);

      dialogRef.afterClosed().subscribe();
    }

    if (this.detailsForm.invalid) return;
    console.log('clicked');
  }

  next() {
    console.log('next');
    this.checkIfFileIsUploading();
    if (this.detailsForm.invalid) return;
    console.log('next2');
  }

  // Contributers -------------------------------------------------------------------------------------
}

/**
 * No file uploading pop up dialog
 */

@Component({
  selector: 'app-no-file-dialog',
  templateUrl: './no-file-dialog.component.html',
})
export class NoFileDialogComponent {}
