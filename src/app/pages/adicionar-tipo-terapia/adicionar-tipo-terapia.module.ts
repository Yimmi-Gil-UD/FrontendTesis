import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarTipoTerapiaPageRoutingModule } from './adicionar-tipo-terapia-routing.module';

import { AdicionarTipoTerapiaPage } from './adicionar-tipo-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarTipoTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdicionarTipoTerapiaPage]
})
export class AdicionarTipoTerapiaPageModule {}
