import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrosLogPage } from './registros-log.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrosLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrosLogPageRoutingModule {}
