import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigTheaterCheckerComponent } from './asig-theater-checker.component';

describe('AsigTheaterCheckerComponent', () => {
  let component: AsigTheaterCheckerComponent;
  let fixture: ComponentFixture<AsigTheaterCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigTheaterCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigTheaterCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
