import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApprovedDisneyComponent } from './incident-approved-disney.component';

describe('IncidentApprovedDisneyComponent', () => {
  let component: IncidentApprovedDisneyComponent;
  let fixture: ComponentFixture<IncidentApprovedDisneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentApprovedDisneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApprovedDisneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
