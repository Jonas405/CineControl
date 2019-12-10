import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApprovedComponent } from './incident-approved.component';

describe('IncidentApprovedComponent', () => {
  let component: IncidentApprovedComponent;
  let fixture: ComponentFixture<IncidentApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
