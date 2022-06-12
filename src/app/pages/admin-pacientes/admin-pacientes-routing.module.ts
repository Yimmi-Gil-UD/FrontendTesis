import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPacientesPage } from './admin-pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPacientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPacientesPageRoutingModule {}
