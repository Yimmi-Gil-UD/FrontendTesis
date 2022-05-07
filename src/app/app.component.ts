import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(MenuComponent) menu:MenuComponent;
  menuOpen = false;
  constructor(
    private menucontroller: MenuController
  ) {}

  toggleMenu():void {
    this.menucontroller.toggle('first');
  }

  changeMenu():void {
    this.menuOpen = !this.menuOpen;
  }

}



