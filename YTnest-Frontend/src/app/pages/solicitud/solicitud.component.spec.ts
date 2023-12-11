import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudComponent } from './solicitud.component';

describe('SolicitudesComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudComponent]
    });
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
