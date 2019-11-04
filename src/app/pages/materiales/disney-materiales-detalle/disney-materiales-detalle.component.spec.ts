import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisneyMaterialesDetalleComponent } from './disney-materiales-detalle.component';

describe('DisneyMaterialesDetalleComponent', () => {
  let component: DisneyMaterialesDetalleComponent;
  let fixture: ComponentFixture<DisneyMaterialesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisneyMaterialesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisneyMaterialesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
