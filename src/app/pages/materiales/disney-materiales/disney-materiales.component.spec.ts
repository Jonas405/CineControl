import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisneyMaterialesComponent } from './disney-materiales.component';

describe('DisneyMaterialesComponent', () => {
  let component: DisneyMaterialesComponent;
  let fixture: ComponentFixture<DisneyMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisneyMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisneyMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
