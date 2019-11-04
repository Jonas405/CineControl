import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonyMaterialesDetalleComponent } from './sony-materiales-detalle.component';

describe('SonyMaterialesDetalleComponent', () => {
  let component: SonyMaterialesDetalleComponent;
  let fixture: ComponentFixture<SonyMaterialesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonyMaterialesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonyMaterialesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
