import {NgModule} from '@angular/core';
import {MarketPlaceRoutingModule} from './market-place-routing.module';
import {CommonModule} from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import {LazyLoadImageModule} from '../../directives/lazy-load-image/lazy-load-image.module';
import {MatDialogModule} from '@angular/material/dialog';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {LazyScrollModule} from '../../directives/lazy-scoll-directive/lazy-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    MarketPlaceRoutingModule,
    LazyLoadImageModule,
    MatDialogModule,
    VirtualScrollerModule,
    LazyScrollModule
  ],
  declarations: [OrdersComponent]
})
export class MarketPlaceModule {}
