import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Kunde } from 'src/app/kunde/shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './stammdaten.component.html',
})
export class StammdatenComponent implements OnInit {
    @Input()
    kunde!: Kunde;

    readonly faStar = faStar;

    constructor() {
        console.log('DetailsStammdatenComponent.constructor()');
    }

    ngOnInit() {
        console.log('kunde=', this.kunde);
    }

    toString() {
        return 'DetailsStammdatenComponent';
    }
}
