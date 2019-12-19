import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApprovedDisneyDetailComponent } from './incident-approved-disney-detail.component';

describe('IncidentApprovedDisneyDetailComponent', () => {
  let component: IncidentApprovedDisneyDetailComponent;
  let fixture: ComponentFixture<IncidentApprovedDisneyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentApprovedDisneyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApprovedDisneyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
