import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  numbers = [1,2,3,4,5,6,7,8,9,10];
  title: string = 'app';
  visible: boolean = true;
  nombre: string = '';
  constructor() {

  }

  show() {
    console.log(this.nombre);
  }

  changeVisible() {
    this.visible = !this.visible;
  }
} 
