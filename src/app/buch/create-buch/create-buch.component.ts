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

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    faCheck,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Buch } from '../shared/buch';
import { BuchService } from '../shared/buch.service';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../shared';
import { Router } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

/**
 * Komponente mit dem Tag &lt;create-buch&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-kund',
    templateUrl: './create-buch.component.html',
})
export class CreateBuchComponent implements OnInit, OnDestroy {
    form = new FormGroup({});
    showWarning = false;
    fertig = false;
    errorMsg = undefined;

    readonly faCheck = faCheck;
    readonly faExclamationTriangle = faExclamationTriangle;
    readonly faExclamationTriangleSize: SizeProp = '2x';

    private saveSubscription: Subscription | undefined;

    constructor(
        private readonly buchService: BuchService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        console.log('CreateBuchComponent.constructor()');
        if (router !== undefined) {
            console.log('Injizierter Router:', router);
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Neues Buch');
    }

    ngOnDestroy() {
        if (this.saveSubscription !== undefined) {
            this.saveSubscription.unsubscribe();
        }
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neues Buch anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onSave() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid     true/false
        //    dirty     true/false, falls der Wert geaendert wurde

        if (!this.form.valid) {
            console.log(
                'CreateBuchComponent.onSave(): Validierungsfehler',
                this.form,
            );
            return false;
        }

        const neuesBuch = Buch.fromForm(this.form.value);
        console.log('CreateBuchComponent.onSave(): neuesBuch=', neuesBuch);

        const successFn = (location: string | undefined) => {
            console.log(
                `CreateBuchComponent.onSave(): successFn(): location=${location}, navigate=${HOME_PATH}`,
            );
            this.fertig = true;
            this.showWarning = false;
            this.router.navigate([HOME_PATH]).then(
                navResult => {
                    if (navResult) {
                        console.log('CreateBuch.onSave(): Navigation');
                        this.errorMsg = undefined;
                    } else {
                        console.error(
                            'CreateBuch.onSave(): Navigation fehlgeschlagen',
                        );
                        this.errorMsg = 'Navigation fehlgeschlagen';
                    }
                },
                () => {
                    console.error(
                        'CreateBuch.onSave(): Navigation fehlgeschlagen',
                    );
                    this.errorMsg = 'Navigation fehlgeschlagen';
                },
            );
        };
        const errorFn = (
            status: number,
            errors: { [s: string]: any } | undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
        ) => {
            console.error(
                `CreateBuch.onSave(): errorFn(): status: ${status}, errors`,
                errors,
            );
            this.errorMsg = errors;
        };
        this.saveSubscription = this.buchService.save(
            neuesBuch,
            successFn,
            errorFn,
        );

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false;
    }
}
