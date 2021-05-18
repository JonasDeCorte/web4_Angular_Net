import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewonerFormDialogComponent } from './bewoner-form-dialog.component';

describe('BewonerFormDialogComponent', () => {
  let component: BewonerFormDialogComponent;
  let fixture: ComponentFixture<BewonerFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BewonerFormDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewonerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
