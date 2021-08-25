import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAudioComponent } from './profile-audio.component';

describe('ProfileAudioComponent', () => {
  let component: ProfileAudioComponent;
  let fixture: ComponentFixture<ProfileAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
