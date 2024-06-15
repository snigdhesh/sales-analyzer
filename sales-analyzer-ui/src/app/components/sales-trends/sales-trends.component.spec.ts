import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrendsComponent } from './sales-trends.component';

describe('SalesTrendsComponent', () => {
  let component: SalesTrendsComponent;
  let fixture: ComponentFixture<SalesTrendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesTrendsComponent]
    });
    fixture = TestBed.createComponent(SalesTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
