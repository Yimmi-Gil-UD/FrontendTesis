import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaTerapiaPageRoutingModule } from './nota-terapia-routing.module';

import { NotaTerapiaPage } from './nota-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NotaTerapiaPage]
})
export class NotaTerapiaPageModule {}
