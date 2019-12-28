import { Component } from '@angular/core';

@Component({
    selector: 'hs-suche-nachname',
    templateUrl: './suche-nachname.component.html',
})
export class SucheNachnameComponent {
    nachname = '';

    constructor() {
        console.log('SucheNachnameComponent.constructor()');
    }
}
