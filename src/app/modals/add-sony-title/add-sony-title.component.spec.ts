import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSonyTitleComponent } from './add-sony-title.component';

describe('AddSonyTitleComponent', () => {
  let component: AddSonyTitleComponent;
  let fixture: ComponentFixture<AddSonyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSonyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSonyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
