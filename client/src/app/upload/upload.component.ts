import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'; // import

import { UserService } from '../_services/user.service';
import { DetailsComponent } from './details/details.component';
import { ContributersFormComponent } from './contributers-form/contributers-form.component';
import { ReferencesFormComponent } from './references-form/references-form.component';
import { ThemeService } from '../_services/theme.service';
import { Subscription } from 'rxjs';
import { UploadService } from '../_services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { Contributer } from '../_models/contributer';
import { Medium } from '../_models/post';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @ViewChild('detailsComponent', { static: false })
  detailsComponent!: DetailsComponent;
  @ViewChild('contributersFormComponent', { static: false })
  contributersFormComponent!: ContributersFormComponent;
  @ViewChild('referencesFormComponent', { static: false })
  referencesFormComponent!: ReferencesFormComponent;

  isDarkMode!: boolean;
  ifFileUploadingListener = new Subscription();
  fileUploading!: boolean;
  fileLink!: string;
  isLoading = false;
  details!: {
    title: string;
    description: string;
    tags: string[];
  };
  contributers!: {
    owners?: string[] | undefined;
    contibuters?: Contributer[] | undefined;
  };

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
  }

  ngOnDestroy() {
    this.ifFileUploadingListener.unsubscribe();
  }

  get detailsForm() {
    return this.detailsComponent?.detailsForm;
  }

  get contributersForm() {
    return this.contributersFormComponent?.contributersForm;
  }

  get refForm() {
    return this.referencesFormComponent?.refForm;
  }

  checkIfFileIsUploading() {
    // Throw error if there is no file uploading
    if (!this.fileUploading) {
      const dialogRef = this.dialog.open(NoFileDialogComponent);

      dialogRef.afterClosed().subscribe();
    }

    if (this.detailsForm.invalid) return;
  }

  recordDetails() {
    // Check form validity before continuing
    this.checkIfFileIsUploading();
    if (this.detailsForm.invalid) return;

    // Make details object to send to service
    const details = {
      title: this.detailsComponent.title.value as string,
      description: this.detailsComponent.description.value as string,
      tags: this.detailsComponent.tags,
    };

    console.log(details);
    this.details = details;
  }

  // Contributers -------------------------------------------------------------------------------------
  recordContributers() {
    // Check form validity before continuing
    this.checkIfFileIsUploading();
    if (this.contributersForm.invalid) return;

    // Make details object to send to service
    const contributers = {
      owners: this.contributersFormComponent.partners,
      contibuters: this.contributersFormComponent.contributers,
    };

    console.log(contributers);
    this.contributers = contributers;
  }

  // References --------------------------------------------------------------------------------
  recordReferences() {
    const refs = this.referencesFormComponent.citations;
    const filePost: Medium = {
      _id: '',
      citations: refs,
      ...this.details,
      ...this.contributers,
      fileUrl: this.uploadService.getFileDestDetails.fileUrl,
      thumbnailUrl: this.uploadService.getFileDestDetails.thumbnailUrl,
      fileType: this.uploadService.getFileDestDetails.fileMimetype,
    };
    console.log(filePost);

    this.uploadService.uploadFileDetails(filePost);
    this.isLoading = true;
  }
}

/**
 * No file uploading pop up dialog
 */

@Component({
  selector: 'app-no-file-dialog',
  templateUrl: './no-file-dialog.component.html',
})
export class NoFileDialogComponent {}
