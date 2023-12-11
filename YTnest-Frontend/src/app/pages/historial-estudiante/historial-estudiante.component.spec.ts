import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEstudianteComponent } from './historial-estudiante.component';

describe('HistorialEstudianteComponent', () => {
  let component: HistorialEstudianteComponent;
  let fixture: ComponentFixture<HistorialEstudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialEstudianteComponent]
    });
    fixture = TestBed.createComponent(HistorialEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
