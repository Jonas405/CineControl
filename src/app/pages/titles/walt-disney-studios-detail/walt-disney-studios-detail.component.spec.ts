import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaltDisneyStudiosDetailComponent } from './walt-disney-studios-detail.component';

describe('WaltDisneyStudiosDetailComponent', () => {
  let component: WaltDisneyStudiosDetailComponent;
  let fixture: ComponentFixture<WaltDisneyStudiosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaltDisneyStudiosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaltDisneyStudiosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
