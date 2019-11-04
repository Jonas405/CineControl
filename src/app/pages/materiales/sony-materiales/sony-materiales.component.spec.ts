import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonyMaterialesComponent } from './sony-materiales.component';

describe('SonyMaterialesComponent', () => {
  let component: SonyMaterialesComponent;
  let fixture: ComponentFixture<SonyMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonyMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonyMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
