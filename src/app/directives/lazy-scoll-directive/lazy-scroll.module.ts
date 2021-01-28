import {NgModule} from '@angular/core';
import {LazyScrollDirective} from './lazy-scroll.directive';

@NgModule({
  exports: [
    LazyScrollDirective
  ],
  declarations: [
    LazyScrollDirective
  ]
})
export class LazyScrollModule {}
