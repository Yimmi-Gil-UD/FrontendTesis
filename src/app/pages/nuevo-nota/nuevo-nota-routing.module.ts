import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoNotaPage } from './nuevo-nota.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoNotaPageRoutingModule {}
