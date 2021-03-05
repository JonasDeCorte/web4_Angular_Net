import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleBewonersComponent } from './alle-bewoners.component';

describe('AlleBewonersComponent', () => {
  let component: AlleBewonersComponent;
  let fixture: ComponentFixture<AlleBewonersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlleBewonersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleBewonersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
