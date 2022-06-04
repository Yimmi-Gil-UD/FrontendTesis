import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaTerapiaPage } from './nota-terapia.page';

const routes: Routes = [
  {
    path: '',
    component: NotaTerapiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaTerapiaPageRoutingModule {}
