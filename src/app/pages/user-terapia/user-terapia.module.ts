import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTerapiaPageRoutingModule } from './user-terapia-routing.module';

import { UserTerapiaPage } from './user-terapia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTerapiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserTerapiaPage]
})
export class UserTerapiaPageModule {}
