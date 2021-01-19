import {Route, RouterModule} from '@angular/router';
import {MyCardsComponent} from './my-cards.component';
import {NgModule} from '@angular/core';

const routes: Route[] = [
  {
    path: '',
    component: MyCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCardsRoutingModule { }
