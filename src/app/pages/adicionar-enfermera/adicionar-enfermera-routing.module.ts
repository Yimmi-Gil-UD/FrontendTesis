import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarEnfermeraPage } from './adicionar-enfermera.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarEnfermeraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarEnfermeraPageRoutingModule {}
