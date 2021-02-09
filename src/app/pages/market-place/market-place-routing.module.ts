import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';

const routes: Route[] = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketPlaceRoutingModule {}
