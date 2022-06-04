import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTerapiaPageRoutingModule } from './detalle-terapia-routing.module';

import { DetalleTerapiaPage } from './detalle-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleTerapiaPage]
})
export class DetalleTerapiaPageModule {}
