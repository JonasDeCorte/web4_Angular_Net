import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneelEditComponent } from './personeel-edit.component';

describe('PersoneelEditComponent', () => {
  let component: PersoneelEditComponent;
  let fixture: ComponentFixture<PersoneelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneelEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
