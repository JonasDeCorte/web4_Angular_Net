import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewonerComponent } from './bewoner.component';

describe('BewonerComponent', () => {
  let component: BewonerComponent;
  let fixture: ComponentFixture<BewonerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewonerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
