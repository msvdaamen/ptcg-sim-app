import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardOverviewRoutingModule} from './card-overview-routing.module';
import {CardOverviewComponent} from './card-overview.component';
import {MatDialogModule} from '@angular/material/dialog';
import {LazyScrollModule} from '../../directives/lazy-scoll-directive/lazy-scroll.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {LazyLoadImageModule} from '../../directives/lazy-load-image/lazy-load-image.module';

@NgModule({
  declarations: [
    CardOverviewComponent
  ],
  imports: [
    CommonModule,
    CardOverviewRoutingModule,
    MatDialogModule,
    LazyScrollModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    LazyLoadImageModule
  ]
})
export class CardOverviewModule {

}
