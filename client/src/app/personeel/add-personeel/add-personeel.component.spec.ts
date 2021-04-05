import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersoneelComponent } from './add-personeel.component';

describe('AddPersoneelComponent', () => {
  let component: AddPersoneelComponent;
  let fixture: ComponentFixture<AddPersoneelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersoneelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersoneelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
