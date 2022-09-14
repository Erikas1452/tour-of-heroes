import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditFormDialogComponent } from './hero-edit-form-dialog.component';

describe('HeroEditFormDialogComponent', () => {
  let component: HeroEditFormDialogComponent;
  let fixture: ComponentFixture<HeroEditFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroEditFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroEditFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
