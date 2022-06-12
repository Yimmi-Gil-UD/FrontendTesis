import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEnfermeraPageRoutingModule } from './detalle-enfermera-routing.module';

import { DetalleEnfermeraPage } from './detalle-enfermera.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEnfermeraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleEnfermeraPage]
})
export class DetalleEnfermeraPageModule {}
