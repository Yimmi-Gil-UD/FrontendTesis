import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarTipoTerapiaPage } from './adicionar-tipo-terapia.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarTipoTerapiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarTipoTerapiaPageRoutingModule {}
