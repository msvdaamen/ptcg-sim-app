import {NgModule} from '@angular/core';
import {MyCardsComponent} from './my-cards.component';
import {CommonModule} from '@angular/common';
import {MyCardsRoutingModule} from './my-cards-routing.module';
import {LazyLoadImageModule} from '../../directives/lazy-load-image/lazy-load-image.module';
import {MatDialogModule} from '@angular/material/dialog';
import {LazyScrollModule} from '../../directives/lazy-scoll-directive/lazy-scroll.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    MyCardsComponent
  ],
  imports: [
    CommonModule,
    MyCardsRoutingModule,
    LazyLoadImageModule,
    MatDialogModule,
    LazyScrollModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MyCardsModule {}
