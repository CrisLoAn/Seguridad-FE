import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YTnestComponent } from './ytnest.component';

describe('YTnestComponent', () => {
  let component: YTnestComponent;
  let fixture: ComponentFixture<YTnestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YTnestComponent]
    });
    fixture = TestBed.createComponent(YTnestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
