import { Component, Output, ViewChild } from '@angular/core';
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Suchkriterien } from '../../shared/kunde.service';
import { fadeIn } from '../../../shared';
import { SucheNachnameComponent } from './suche-nachname.component';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';
import { SucheEmailComponent } from './suche-email.component';
import { SucheInteresseComponent } from './suche-interesse.component';

@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent{
    @Output()
    readonly suchkriterien = new Subject<Suchkriterien>();

    readonly faInfoCircle = faInfoCircle;
    readonly faSearch = faSearch;

    @ViewChild(SucheNachnameComponent, {static: true})
    private readonly sucheNachnameComponent!: SucheNachnameComponent;

    @ViewChild(SucheGeschlechtComponent, {static: true})
    private readonly sucheGeschlechtComponent!: SucheGeschlechtComponent;

    @ViewChild(SucheEmailComponent, {static: true})
    private readonly sucheEmailComponent!: SucheEmailComponent;

    @ViewChild(SucheInteresseComponent, {static: true})
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
      interesse: { lesen, reisen, sport},
    })
    return false;
    }
}
