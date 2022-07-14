import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTipoTerapiaPageRoutingModule } from './detalle-tipo-terapia-routing.module';

import { DetalleTipoTerapiaPage } from './detalle-tipo-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTipoTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleTipoTerapiaPage]
})
export class DetalleTipoTerapiaPageModule {}
