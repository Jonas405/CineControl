import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidenciaSonyComponent } from './add-incidencia-sony.component';

describe('AddIncidenciaSonyComponent', () => {
  let component: AddIncidenciaSonyComponent;
  let fixture: ComponentFixture<AddIncidenciaSonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidenciaSonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidenciaSonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
