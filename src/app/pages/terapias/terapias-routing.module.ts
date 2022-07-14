import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerapiasPage } from './terapias.page';

const routes: Routes = [
  {
    path: '',
    component: TerapiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerapiasPageRoutingModule {}
