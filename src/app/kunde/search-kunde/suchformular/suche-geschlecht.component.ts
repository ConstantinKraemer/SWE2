import { Component } from '@angular/core';
import { GeschlechtType } from '../../shared/kunde';

@Component({
    selector: 'hs-suche-geschlecht',
    templateUrl: './suche-geschlecht.component.html',
})
export class SucheGeschlechtComponent {
    geschlecht: GeschlechtType | '' = '';

    constructor() {
        console.log('SucheGeschlechtComponent.constructor()');
    }
}
