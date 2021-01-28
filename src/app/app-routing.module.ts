import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {RarityOverviewComponent} from './pages/rarity-overview/rarity-overview.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'opener',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pack-opener/pack-opener.module').then(m => m.PackOpenerModule)
  },
  {
    path: 'my-cards',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/my-cards/my-cards.module').then(m => m.MyCardsModule)
  },
  {
    path: 'card-overview',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/card-overview/card-overview.module').then(m => m.CardOverviewModule)
  },
  {
    path: 'rarity-overview',
    canActivate: [AuthGuard],
    component: RarityOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
