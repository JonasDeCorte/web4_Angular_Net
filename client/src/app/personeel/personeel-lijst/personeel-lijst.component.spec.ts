import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneelLijstComponent } from './personeel-lijst.component';

describe('PersoneelLijstComponent', () => {
  let component: PersoneelLijstComponent;
  let fixture: ComponentFixture<PersoneelLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneelLijstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneelLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
