import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEnfermerasPage } from './admin-enfermeras.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEnfermerasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEnfermerasPageRoutingModule {}
