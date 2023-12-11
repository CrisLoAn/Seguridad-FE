import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevocacionesListComponent } from './revocaciones-list.component';

describe('RevocacionesListComponent', () => {
  let component: RevocacionesListComponent;
  let fixture: ComponentFixture<RevocacionesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevocacionesListComponent]
    });
    fixture = TestBed.createComponent(RevocacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
