import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImagesComponent } from './profile-images.component';

describe('ProfileImagesComponent', () => {
  let component: ProfileImagesComponent;
  let fixture: ComponentFixture<ProfileImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
