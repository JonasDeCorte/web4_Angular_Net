import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewonersComponent } from './bewoners.component';

describe('BewonersComponent', () => {
  let component: BewonersComponent;
  let fixture: ComponentFixture<BewonersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewonersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewonersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
