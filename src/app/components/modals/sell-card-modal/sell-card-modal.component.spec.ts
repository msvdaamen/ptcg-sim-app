import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCardModalComponent } from './sell-card-modal.component';

describe('SellCardModalComponent', () => {
  let component: SellCardModalComponent;
  let fixture: ComponentFixture<SellCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
