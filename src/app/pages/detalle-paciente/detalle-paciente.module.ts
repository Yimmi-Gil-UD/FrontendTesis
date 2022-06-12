import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePacientePageRoutingModule } from './detalle-paciente-routing.module';

import { DetallePacientePage } from './detalle-paciente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePacientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetallePacientePage]
})
export class DetallePacientePageModule {}
