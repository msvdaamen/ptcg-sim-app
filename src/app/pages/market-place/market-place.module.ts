import {NgModule} from '@angular/core';
import {MarketPlaceRoutingModule} from './market-place-routing.module';
import {CommonModule} from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import {LazyLoadImageModule} from '../../directives/lazy-load-image/lazy-load-image.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MarketPlaceRoutingModule,
    LazyLoadImageModule,
    MatDialogModule
  ],
  declarations: [OrdersComponent]
})
export class MarketPlaceModule {}
