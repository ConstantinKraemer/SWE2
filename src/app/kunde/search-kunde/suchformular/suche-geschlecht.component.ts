import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hs-suche-email',
  templateUrl: './suche-email.component.html',
})
export class SucheGeschlechtComponent {
  geschlecht = false;

  constructor() { 
    console.log('SucheGeschlechtComponent.constructor()');
  }
}
