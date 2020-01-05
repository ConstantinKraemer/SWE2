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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../../shared';
import { Kunde } from '../../shared/kunde';
import { KundeService } from '../../shared/kunde.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente f&uuml;r das Tag <code>hs-interessen</code>
 */
@Component({
    selector: 'hs-update-interessen',
    templateUrl: './update-interessen.component.html',
})
export class UpdateInteressenComponent implements OnInit, OnDestroy {
    // <hs-update-interessen [kunde]="...">
    @Input()
    readonly kunde!: Kunde;

    form!: FormGroup;
    lesen!: FormControl;
    reisen!: FormControl;
    sport!: FormControl;

    readonly faCheck = faCheck;

    private updateSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
    ) {
        console.log('UpdateInteressenComponent.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Interessen des zu &auml;ndernden Kunden vorbelegen.
     */
    ngOnInit() {
        console.log('kunde=', this.kunde);

        // Definition und Vorbelegung der Eingabedaten (hier: Checkbox)
        const hasLesen = this.kunde.hasInteresse('LESEN');
        this.lesen = new FormControl(hasLesen);
        const hasReisen = this.kunde.hasInteresse('REISEN');
        this.reisen = new FormControl(hasReisen);
        const hasSport = this.kunde.hasInteresse('SPORT');
        this.sport = new FormControl(hasSport);

        this.form = new FormGroup({
            // siehe ngFormControl innerhalb von @Component({template: `...`})
            lesen: this.lesen,
            reisen: this.reisen,
            sport: this.sport,
        });
    }

    ngOnDestroy() {
        if (this.updateSubscription !== undefined) {
            this.updateSubscription.unsubscribe();
        }
    }

    /**
     * Die aktuellen Interessen f&uuml;r das angezeigte Kunden-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onUpdate() {
        if (this.form.pristine) {
            console.log(
                'UpdateInteressenComponent.onUpdate(): keine Aenderungen',
            );
            return undefined;
        }

        if (this.kunde === undefined) {
            console.error(
                'UpdateInteressenComponent.onUpdate(): kunde === undefined',
            );
            return undefined;
        }

        this.kunde.updateInteressen(
            this.lesen.value,
            this.reisen.value,
            this.sport.value,
        );
        console.log('kunde=', this.kunde);

        const successFn = () => {
            console.log(
                `UpdateInteressenComponent.onUpdate(): successFn: path: ${HOME_PATH}`,
            );
            this.router.navigate([HOME_PATH]).then(
                navResult => {
                    if (navResult) {
                        console.log(
                            'UpdateInteressenComponent.onUpdate(): Navigation',
                        );
                    } else {
                        console.error(
                            'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen',
                        );
                    }
                },
                () =>
                    console.error(
                        'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen',
                    ),
            );
        };
        const errorFn: (
            status: number,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errors: { [s: string]: any } | undefined,
        ) => void = (status, errors = undefined) => {
            console.error(
                `UpdateInteressenComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
                errors,
            );
        };
        this.updateSubscription = this.kundeService.update(
            this.kunde,
            successFn,
            errorFn,
        );

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }
}
