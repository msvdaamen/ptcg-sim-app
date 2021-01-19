import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackOpenerRoutingModule} from './pack-opener-routing.module';
import {PackOpenerComponent} from './pack-opener.component';

@NgModule({
  declarations: [
    PackOpenerComponent
  ],
  imports: [
    CommonModule,
    PackOpenerRoutingModule
  ]
})
export class PackOpenerModule {}
