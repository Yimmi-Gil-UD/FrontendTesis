import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarEnfermeraPage } from './editar-enfermera.page';

const routes: Routes = [
  {
    path: '',
    component: EditarEnfermeraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarEnfermeraPageRoutingModule {}
