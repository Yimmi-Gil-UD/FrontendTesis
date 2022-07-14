import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerapiasPageRoutingModule } from './terapias-routing.module';

import { TerapiasPage } from './terapias.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerapiasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [TerapiasPage]
})
export class TerapiasPageModule {}
