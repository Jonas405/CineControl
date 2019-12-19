import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApprovedSonyDetailComponent } from './incident-approved-sony-detail.component';

describe('IncidentApprovedSonyDetailComponent', () => {
  let component: IncidentApprovedSonyDetailComponent;
  let fixture: ComponentFixture<IncidentApprovedSonyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentApprovedSonyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApprovedSonyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
