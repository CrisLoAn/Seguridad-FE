import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceConfirmationModalComponent } from './residence-confirmation-modal.component';

describe('ResidenceConfirmationModalComponent', () => {
  let component: ResidenceConfirmationModalComponent;
  let fixture: ComponentFixture<ResidenceConfirmationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResidenceConfirmationModalComponent]
    });
    fixture = TestBed.createComponent(ResidenceConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
