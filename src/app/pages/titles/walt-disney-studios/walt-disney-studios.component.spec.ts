import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaltDisneyStudiosComponent } from './walt-disney-studios.component';

describe('WaltDisneyStudiosComponent', () => {
  let component: WaltDisneyStudiosComponent;
  let fixture: ComponentFixture<WaltDisneyStudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaltDisneyStudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaltDisneyStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
