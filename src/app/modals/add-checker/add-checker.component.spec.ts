import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckerComponent } from './add-checker.component';

describe('AddCheckerComponent', () => {
  let component: AddCheckerComponent;
  let fixture: ComponentFixture<AddCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
