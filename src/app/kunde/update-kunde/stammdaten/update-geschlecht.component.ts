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
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GeschlechtType } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-geschlecht</code>
 */
@Component({
    selector: 'hs-update-geschlecht',
    templateUrl: './update-geschlecht.component.html',
})
export class UpdateGeschlechtComponent implements OnInit {
    // <hs-update-geschlecht [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue!: GeschlechtType;

    geschlecht!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateGeschlechtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.geschlecht = new FormControl(
            this.currentValue,
            Validators.required,
        );
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
