import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { DetailsComponent } from './details/details.component';
import { ContributersFormComponent } from './contributers-form/contributers-form.component';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  linksForm!: FormGroup;
  @ViewChild('detailsComponent', { static: false })
  detailsComponent!: DetailsComponent;

  @ViewChild('contributersFormComponent', { static: false })
  contributersFormComponent!: ContributersFormComponent;
  isDarkMode!: boolean;

  constructor(
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.getIsDarkMode;
    // this.themeService.themeStatusListener.subscribe((isDark) => {
    //   this.isDarkMode = isDark;
    //   console.log(isDark);
    // });
    console.log(this.isDarkMode);
  }

  // ngAfterViewInit() {
  //   this.contributersFormComponent = new ContributersFormComponent()
  // }

  get detailsForm() {
    return this.detailsComponent?.detailsForm;
  }

  get contributersForm() {
    return this.contributersFormComponent?.contributesForm;
  }

  // Contributers -------------------------------------------------------------------------------------
}
