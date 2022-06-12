import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEnfermeraPageRoutingModule } from './editar-enfermera-routing.module';

import { EditarEnfermeraPage } from './editar-enfermera.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarEnfermeraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditarEnfermeraPage]
})
export class EditarEnfermeraPageModule {}
