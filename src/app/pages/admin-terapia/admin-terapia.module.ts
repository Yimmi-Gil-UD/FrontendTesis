import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTerapiaPageRoutingModule } from './admin-terapia-routing.module';

import { AdminTerapiaPage } from './admin-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTerapiaPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [AdminTerapiaPage]
})
export class AdminTerapiaPageModule {}
