import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'opener',
    loadChildren: () => import('./pages/pack-opener/pack-opener.module').then(m => m.PackOpenerModule)
  },
  {
    path: 'my-cards',
    loadChildren: () => import('./pages/my-cards/my-cards.module').then(m => m.MyCardsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
