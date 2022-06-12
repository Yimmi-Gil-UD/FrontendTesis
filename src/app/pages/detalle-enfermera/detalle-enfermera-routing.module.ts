import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleEnfermeraPage } from './detalle-enfermera.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEnfermeraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleEnfermeraPageRoutingModule {}
