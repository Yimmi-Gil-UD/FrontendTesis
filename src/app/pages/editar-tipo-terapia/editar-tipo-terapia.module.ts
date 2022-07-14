import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTipoTerapiaPageRoutingModule } from './editar-tipo-terapia-routing.module';

import { EditarTipoTerapiaPage } from './editar-tipo-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTipoTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditarTipoTerapiaPage]
})
export class EditarTipoTerapiaPageModule {}
