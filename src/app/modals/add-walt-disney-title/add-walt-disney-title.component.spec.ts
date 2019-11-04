import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaltDisneyTitleComponent } from './add-walt-disney-title.component';

describe('AddWaltDisneyTitleComponent', () => {
  let component: AddWaltDisneyTitleComponent;
  let fixture: ComponentFixture<AddWaltDisneyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWaltDisneyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaltDisneyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
