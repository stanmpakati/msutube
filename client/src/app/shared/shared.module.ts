import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from '../_helpers/file-drop.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FileDropDirective],
  exports: [
    CommonModule,
    FileDropDirective,
    FlexLayoutModule,
    ImageCropperModule,
  ],
})
export class SharedModule {}
