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
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    // moduleId: module.id,
    selector: 'hs-create-homepage',
    templateUrl: './create-homepage.component.html',
})
export class CreateHomepageComponent implements OnInit {
    private static readonly MIN_LENGTH = 3;

    @Input()
    readonly form!: FormGroup;

    // eslint-disable-next-line array-bracket-newline
    readonly homepage = new FormControl(undefined, [
        Validators.minLength(CreateHomepageComponent.MIN_LENGTH),
        // eslint-disable-next-line array-bracket-newline
    ]);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateHomepageComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('homepage', this.homepage);
    }
}
