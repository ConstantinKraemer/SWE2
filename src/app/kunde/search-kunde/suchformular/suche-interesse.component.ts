import { Component } from '@angular/core';

@Component({
    selector: 'hs-suche-interesse',
    templateUrl: './suche-interesse.component.html',
    styles: [],
})
export class SucheInteresseComponent {
    lesen = false;
    reisen = false;
    sport = false;

    constructor() {
        console.log('SucheInteresseComponent.constructor()');
    }
}
