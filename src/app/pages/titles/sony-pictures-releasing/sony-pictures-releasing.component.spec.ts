import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonyPicturesReleasingComponent } from './sony-pictures-releasing.component';

describe('SonyPicturesReleasingComponent', () => {
  let component: SonyPicturesReleasingComponent;
  let fixture: ComponentFixture<SonyPicturesReleasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonyPicturesReleasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonyPicturesReleasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
