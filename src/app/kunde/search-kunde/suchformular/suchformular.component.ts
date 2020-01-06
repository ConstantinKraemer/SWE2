import { Component, Output, ViewChild } from '@angular/core';
import { fadeIn } from '../../../shared';
// eslint-disable-next-line sort-imports
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { SucheEmailComponent } from './suche-email.component';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';
import { SucheInteresseComponent } from './suche-interesse.component';
import { SucheNachnameComponent } from './suche-nachname.component';
import { Suchkriterien } from '../../shared/kunde.service';

@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent {
    @Output()
    readonly suchkriterien = new Subject<Suchkriterien>();

    readonly faInfoCircle = faInfoCircle;
    readonly faSearch = faSearch;

    @ViewChild(SucheNachnameComponent, { static: true })
    private readonly sucheNachnameComponent!: SucheNachnameComponent;

    @ViewChild(SucheGeschlechtComponent, { static: true })
    private readonly sucheGeschlechtComponent!: SucheGeschlechtComponent;

    @ViewChild(SucheEmailComponent, { static: true })
    private readonly sucheEmailComponent!: SucheEmailComponent;

    @ViewChild(SucheInteresseComponent, { static: true })
    private readonly sucheInteresseComponent!: SucheInteresseComponent;

    constructor() {
        console.log('SuchformularComponent.constructor()');
    }

    onFind() {
        const { nachname } = this.sucheNachnameComponent;
        const { geschlecht } = this.sucheGeschlechtComponent;
        const { email } = this.sucheEmailComponent;
        const { lesen } = this.sucheInteresseComponent;
        const { reisen } = this.sucheInteresseComponent;
        const { sport } = this.sucheInteresseComponent;
        console.log(
            `SuchformularComponent.onFind(): nachname=${nachname}, geschlecht=${geschlecht}, email=${email}, lesen=${lesen}, reisen=${reisen}, sport= ${sport}`,
        );

        this.suchkriterien.next({
            nachname,
            geschlecht,
            email,
            interesse: { lesen, reisen, sport },
        });
        return false;
    }
}
