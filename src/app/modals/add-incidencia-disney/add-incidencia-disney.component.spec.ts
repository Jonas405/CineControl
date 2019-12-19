import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidenciaDisneyComponent } from './add-incidencia-disney.component';

describe('AddIncidenciaDisneyComponent', () => {
  let component: AddIncidenciaDisneyComponent;
  let fixture: ComponentFixture<AddIncidenciaDisneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidenciaDisneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidenciaDisneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
