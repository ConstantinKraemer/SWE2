import { Component, OnInit } from '@angular/core';
import { Suchkriterien } from '../shared/kunde.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'hs-suche-buecher',
    template: `
        <hs-suchformular
            (suchkriterien)="setSuchkriterien($event)"
        ></hs-suchformular>
        <hs-suchergebnis [suchkriterien]="suchkriterien"></hs-suchergebnis>
    `,
})
export class SucheKundeComponent implements OnInit {
    suchkriterien!: Suchkriterien;

    // Wird von der JS-Engine aufgerufen
    constructor(private readonly titleService: Title) {
        console.log('SucheKundeComponent.constructor()');
    }

    // Wird von Angular aufgerufen, wenn der DOM-Baum fertig ist,
    // d.h. nach dem "Rendering".
    // Wird immer generiert, wenn Angular-CLI genutzt wird.
    ngOnInit() {
        this.titleService.setTitle('Suche');
    }
    setSuchkriterien($event: Suchkriterien) {
        console.log(
            'SucheKundeComponent.setSuchkriterien(): suchkriterien=',
            $event,
        );
        this.suchkriterien = $event;
    }
}
