import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentPendingSonyComponent } from './incident-pending-sony.component';

describe('IncidentPendingSonyComponent', () => {
  let component: IncidentPendingSonyComponent;
  let fixture: ComponentFixture<IncidentPendingSonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentPendingSonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentPendingSonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
