import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEnfermerasPageRoutingModule } from './admin-enfermeras-routing.module';

import { AdminEnfermerasPage } from './admin-enfermeras.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEnfermerasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminEnfermerasPage]
})
export class AdminEnfermerasPageModule {}
