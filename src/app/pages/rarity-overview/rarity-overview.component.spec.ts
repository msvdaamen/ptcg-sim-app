import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RarityOverviewComponent } from './rarity-overview.component';

describe('RarityOverviewComponent', () => {
  let component: RarityOverviewComponent;
  let fixture: ComponentFixture<RarityOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RarityOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RarityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
