import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTerapiaPage } from './admin-terapia.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTerapiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTerapiaPageRoutingModule {}
