/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Input, OnInit } from '@angular/core';
import { BuchArt } from '../../shared/buch';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-art</code>
 */
@Component({
    selector: 'hs-details-art',
    templateUrl: './details-art.component.html',
})
export class DetailsArtComponent implements OnInit {
    @Input()
    readonly art!: BuchArt;

    ngOnInit() {
        console.log(`DetailsArtComponent.art=${this.art}`);
    }
}
