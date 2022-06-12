import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPacientesPageRoutingModule } from './admin-pacientes-routing.module';

import { AdminPacientesPage } from './admin-pacientes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPacientesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminPacientesPage]
})
export class AdminPacientesPageModule {}
