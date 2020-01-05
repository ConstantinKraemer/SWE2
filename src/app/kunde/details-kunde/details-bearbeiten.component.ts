import { Component, Input, OnInit } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
/**
 * Komponente f&uuml;r das Tag <code>hs-details-bearbeiten</code>
 */
@Component({
    selector: 'hs-details-bearbeiten',
    templateUrl: './details-bearbeiten.component.html',
})
export class DetailsBearbeitenComponent implements OnInit {
    @Input()
    readonly id: string | undefined;

    readonly faEdit = faEdit;
    readonly faEditSize: SizeProp = '2x';

    ngOnInit() {
        console.log(`DetailsBearbeitenComponent.id=${this.id}`);
    }
}
