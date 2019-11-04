import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidenciaComponent } from './add-incidencia.component';

describe('AddIncidenciaComponent', () => {
  let component: AddIncidenciaComponent;
  let fixture: ComponentFixture<AddIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
