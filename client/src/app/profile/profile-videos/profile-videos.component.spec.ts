import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVideosComponent } from './profile-videos.component';

describe('ProfileVideosComponent', () => {
  let component: ProfileVideosComponent;
  let fixture: ComponentFixture<ProfileVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
