import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTipoTerapiaPage } from './detalle-tipo-terapia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTipoTerapiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTipoTerapiaPageRoutingModule {}
