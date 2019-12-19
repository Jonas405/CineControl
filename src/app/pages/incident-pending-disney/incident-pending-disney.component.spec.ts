import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentPendingDisneyComponent } from './incident-pending-disney.component';

describe('IncidentPendingDisneyComponent', () => {
  let component: IncidentPendingDisneyComponent;
  let fixture: ComponentFixture<IncidentPendingDisneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentPendingDisneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentPendingDisneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
