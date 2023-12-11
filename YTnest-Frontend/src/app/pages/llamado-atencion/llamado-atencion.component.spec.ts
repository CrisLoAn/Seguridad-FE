import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadoAtencionComponent } from './llamado-atencion.component';

describe('LlamadoAtencionComponent', () => {
  let component: LlamadoAtencionComponent;
  let fixture: ComponentFixture<LlamadoAtencionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadoAtencionComponent]
    });
    fixture = TestBed.createComponent(LlamadoAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
