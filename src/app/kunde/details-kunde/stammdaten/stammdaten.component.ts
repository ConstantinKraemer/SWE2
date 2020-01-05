import { Component, Input, OnInit } from '@angular/core';
import { Kunde } from 'src/app/kunde/shared/kunde';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
