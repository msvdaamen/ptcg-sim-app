import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CardOverviewComponent} from './card-overview.component';

const routes: Route[] = [
  {
    path: '',
    component: CardOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardOverviewRoutingModule {}
