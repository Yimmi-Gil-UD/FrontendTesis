import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTerapiaPage } from './detalle-terapia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTerapiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTerapiaPageRoutingModule {}
