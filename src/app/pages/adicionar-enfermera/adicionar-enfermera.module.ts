import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarEnfermeraPageRoutingModule } from './adicionar-enfermera-routing.module';

import { AdicionarEnfermeraPage } from './adicionar-enfermera.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarEnfermeraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdicionarEnfermeraPage]
})
export class AdicionarEnfermeraPageModule {}
