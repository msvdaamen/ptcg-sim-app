import {NgModule} from '@angular/core';
import {MyCardsComponent} from './my-cards.component';
import {CommonModule} from '@angular/common';
import {MyCardsRoutingModule} from './my-cards-routing.module';
import {LazyLoadImageModule} from '../../directives/lazy-load-image/lazy-load-image.module';

@NgModule({
  declarations: [
    MyCardsComponent
  ],
  imports: [
    CommonModule,
    MyCardsRoutingModule,
    LazyLoadImageModule
  ]
})
export class MyCardsModule {}
