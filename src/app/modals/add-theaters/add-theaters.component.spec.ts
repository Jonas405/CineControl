import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTheatersComponent } from './add-theaters.component';

describe('AddTheatersComponent', () => {
  let component: AddTheatersComponent;
  let fixture: ComponentFixture<AddTheatersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTheatersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
