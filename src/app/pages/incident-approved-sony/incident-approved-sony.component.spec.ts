import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApprovedSonyComponent } from './incident-approved-sony.component';

describe('IncidentApprovedSonyComponent', () => {
  let component: IncidentApprovedSonyComponent;
  let fixture: ComponentFixture<IncidentApprovedSonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentApprovedSonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApprovedSonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
