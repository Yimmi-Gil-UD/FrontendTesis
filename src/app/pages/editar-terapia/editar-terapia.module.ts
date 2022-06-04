import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTerapiaPageRoutingModule } from './editar-terapia-routing.module';

import { EditarTerapiaPage } from './editar-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditarTerapiaPage]
})
export class EditarTerapiaPageModule {}
