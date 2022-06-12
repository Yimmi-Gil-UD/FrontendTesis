import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPacientePageRoutingModule } from './editar-paciente-routing.module';

import { EditarPacientePage } from './editar-paciente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPacientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditarPacientePage]
})
export class EditarPacientePageModule {}
