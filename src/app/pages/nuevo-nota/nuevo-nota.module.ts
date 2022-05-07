import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoNotaPageRoutingModule } from './nuevo-nota-routing.module';

import { NuevoNotaPage } from './nuevo-nota.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoNotaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NuevoNotaPage]
})
export class NuevoNotaPageModule {}
