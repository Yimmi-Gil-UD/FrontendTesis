import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleNotaPage } from './detalle-nota.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleNotaPageRoutingModule {}
