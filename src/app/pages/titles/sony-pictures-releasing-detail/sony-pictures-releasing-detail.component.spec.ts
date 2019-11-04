import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonyPicturesReleasingDetailComponent } from './sony-pictures-releasing-detail.component';

describe('SonyPicturesReleasingDetailComponent', () => {
  let component: SonyPicturesReleasingDetailComponent;
  let fixture: ComponentFixture<SonyPicturesReleasingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonyPicturesReleasingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonyPicturesReleasingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
