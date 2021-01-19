import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PackOpenerComponent} from './pack-opener.component';

const routes: Route[] = [
  {
    path: '',
    component: PackOpenerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackOpenerRoutingModule {

}
