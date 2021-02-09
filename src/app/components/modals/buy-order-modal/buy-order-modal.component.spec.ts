import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderModalComponent } from './buy-order-modal.component';

describe('BuyOrderModalComponent', () => {
  let component: BuyOrderModalComponent;
  let fixture: ComponentFixture<BuyOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyOrderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
