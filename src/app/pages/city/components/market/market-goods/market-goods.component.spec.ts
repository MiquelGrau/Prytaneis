import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketGoodsComponent } from './market-goods.component';

describe('MarketGoodsComponent', () => {
  let component: MarketGoodsComponent;
  let fixture: ComponentFixture<MarketGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketGoodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
