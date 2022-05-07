import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleNotaPageRoutingModule } from './detalle-nota-routing.module';

import { DetalleNotaPage } from './detalle-nota.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleNotaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleNotaPage]
})
export class DetalleNotaPageModule {}
