import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApprovedDetailComponent } from './incident-approved-detail.component';

describe('IncidentApprovedDetailComponent', () => {
  let component: IncidentApprovedDetailComponent;
  let fixture: ComponentFixture<IncidentApprovedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentApprovedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApprovedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
