import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrosLogPageRoutingModule } from './registros-log-routing.module';

import { RegistrosLogPage } from './registros-log.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrosLogPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [RegistrosLogPage]
})
export class RegistrosLogPageModule {}
