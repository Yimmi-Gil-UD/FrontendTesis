import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEnfermerasPageRoutingModule } from './admin-enfermeras-routing.module';

import { AdminEnfermerasPage } from './admin-enfermeras.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEnfermerasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [AdminEnfermerasPage]
})
export class AdminEnfermerasPageModule {}
