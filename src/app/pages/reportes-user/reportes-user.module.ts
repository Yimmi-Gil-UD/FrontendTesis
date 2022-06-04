import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesUserPageRoutingModule } from './reportes-user-routing.module';

import { ReportesUserPage } from './reportes-user.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesUserPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportesUserPage]
})
export class ReportesUserPageModule {}
