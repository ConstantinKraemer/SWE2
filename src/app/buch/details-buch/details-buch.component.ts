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

import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Buch } from '../shared/buch';
import { BuchService } from '../shared/buch.service';
import { HttpStatus } from '../../shared';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-buch</code>
 */
@Component({
    selector: 'hs-details-buch',
    templateUrl: './details-buch.component.html',
})
export class DetailsBuchComponent implements OnInit, OnDestroy {
    waiting = true;
    buch: Buch | undefined;
    errorMsg: string | undefined;
    isAdmin!: boolean;

    private buchSubscription!: Subscription;
    private errorSubscription!: Subscription;
    private idParamSubscription!: Subscription;
    private isAdminSubscription!: Subscription;
    private findByIdSubscription: Subscription | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly buchService: BuchService,
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
    ) {
        console.log('DetailsBuchComponent.constructor()');
    }

    ngOnInit() {
        // Die Beobachtung starten, ob es ein zu darzustellendes Buch oder
        // einen Fehler gibt.
        this.buchSubscription = this.subscribeBuch();
        this.errorSubscription = this.subscribeError();
        this.idParamSubscription = this.subscribeIdParam();

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin;
        this.isAdminSubscription = this.subscribeIsAdmin();
    }

    ngOnDestroy() {
        this.buchSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.idParamSubscription.unsubscribe();
        this.isAdminSubscription.unsubscribe();

        if (this.findByIdSubscription !== undefined) {
            this.findByIdSubscription.unsubscribe();
        }
    }

    private subscribeBuch() {
        const next = (buch: Buch) => {
            this.waiting = false;
            this.buch = buch;
            console.log('DetailsBuchComponent.buch=', this.buch);
            const titel =
                this.buch === undefined
                    ? 'Details'
                    : `Details ${this.buch._id}`;
            this.titleService.setTitle(titel);
        };
        return this.buchService.buchSubject.subscribe(next);
    }

    private subscribeError() {
        const next = (err: string | number | undefined) => {
            this.waiting = false;
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                return;
            }

            if (typeof err === 'string') {
                this.errorMsg = err;
                return;
            }

            this.errorMsg =
                err === HttpStatus.NOT_FOUND
                    ? 'Kein Buch gefunden.'
                    : 'Ein Fehler ist aufgetreten.';
            console.log(`DetailsBuchComponent.errorMsg: ${this.errorMsg}`);

            this.titleService.setTitle('Fehler');
        };

        return this.buchService.errorSubject.subscribe(next);
    }

    private subscribeIdParam() {
        // Pfad-Parameter aus /buecher/:id
        // UUID (oder Mongo-ID) ist ein String
        const next = (params: Params) => {
            console.log(
                'DetailsBuchComponent.subscribeIdParam(): params=',
                params,
            );
            this.findByIdSubscription = this.buchService.findById(params.id);
        };
        // ActivatedRoute.params ist ein Observable
        return this.route.params.subscribe(next);
    }

    private subscribeIsAdmin() {
        const nextIsAdmin = (event: Array<string>) => {
            this.isAdmin = event.includes(ROLLE_ADMIN);
            console.log(
                `DetailsBuchComponent.subscribeIsAdmin(): isAdmin=${this.isAdmin}`,
            );
        };
        return this.authService.rollenSubject.subscribe(nextIsAdmin);
    }
}
