import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoModalComponent } from './card-info-modal.component';

describe('CardInfoModalComponent', () => {
  let component: CardInfoModalComponent;
  let fixture: ComponentFixture<CardInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
