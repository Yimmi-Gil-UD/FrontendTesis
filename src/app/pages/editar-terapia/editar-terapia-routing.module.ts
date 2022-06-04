import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTerapiaPage } from './editar-terapia.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTerapiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTerapiaPageRoutingModule {}
