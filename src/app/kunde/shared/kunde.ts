/* eslint-disable @typescript-eslint/no-extra-parens */
// eslint:disable:max-file-line-count
import * as moment from 'moment';
// eslint-disable-next-line sort-imports
import 'moment/locale/de';
import Umsatz from './kunde.umsatz';

moment.locale('de');

export enum FamilienstandType {
    VERHEIRATET = 'VH',
    LEDIG = 'L',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
}

export enum GeschlechtType {
    MAENNLICH = 'M',
    WEIBLICH = 'W',
    DIVERS = 'D',
}
export interface Adress {
    plz: string;
    ort: string;
}

export interface User {
    username: string;
    password: string;
}
export interface KundeShared {
    id?: string;
    nachname?: string;
    email: string;
    kategorie?: number;
    newsletter?: boolean;
    geburtsdatum?: Date;
    umsatz?: Umsatz;
    homepage?: URL;
    geschlecht?: GeschlechtType | '';
    familienstand?: FamilienstandType;
    username?: string;
    adresse?: Adress;
    user?: User;
    version?: number;
}

interface Href {
    href: string;
}

interface SelfLink {
    self: Href;
}

export interface KundeServer extends KundeShared {
    interessen?: Array<string>;
    links?: any;
    _links?: SelfLink;
}

export interface KundeForm extends KundeShared {
    betrag: number;
    waehrung: string;
    plz: string;
    ort: string;
    kategorie: number;
    username: string;
    password: string;
    S?: boolean;
    L?: boolean;
    R?: boolean;
}
/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten UND
 * Functions fuer Abfragen und Aenderungen.
 */

export class Kunde {
    // ratingArray: Array<boolean> = [];

    // wird aufgerufen von fromServer() oder von fromForm()
    // eslint-disable-next-line max-params
    private constructor(
        // tslint:disable-next-line:variable-name
        public id: string | undefined,
        public nachname: string | undefined,
        public email: string,
        public kategorie: number | undefined,
        public newsletter: boolean | undefined,
        public geburtsdatum: Date | undefined,
        public umsatz: Umsatz | undefined,
        public homepage: URL | undefined,
        public geschlecht: GeschlechtType | '',
        public familienstand: FamilienstandType | undefined,
        public interessen: Array<string> | undefined,
        public adresse: Adress,
        public user: User | undefined,
        public version: number | undefined,
    ) {
        this.id = id;
        this.nachname = nachname;
        this.email = email;
        this.kategorie = kategorie;
        this.newsletter = newsletter;
        this.geburtsdatum = geburtsdatum;
        this.umsatz =
            // eslint-disable-next-line no-negated-condition
            umsatz !== undefined
                ? umsatz
                : (this.umsatz = new Umsatz(0, 'EUR'));
        this.geschlecht = geschlecht;
        this.familienstand = familienstand;
        this.interessen = interessen;
        this.adresse = adresse;
        this.user = user;
        this.version = version || undefined;
    }
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined;
        if (kundeServer.links !== undefined) {
            // innerhalb von einem JSON-Array
            selfLink = kundeServer.links[1].href;
        } else if (kundeServer._links !== undefined) {
            // ein einzelnes JSON-Objekt
            selfLink = kundeServer._links.self.href;
        }
        let id: string | undefined;
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/');
            id = selfLink.substring(lastSlash + 1);
        }
        let version: number | undefined;
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1);
            version = Number.parseInt(versionStr, 10);
        }

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            kundeServer.umsatz,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            kundeServer.adresse,
            kundeServer.user,
            version,
        );
        console.log('Kunde.fromServer(): kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param buch JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        const interessen: Array<string> = [];
        if (kundeForm.S === true) {
            interessen.push('S');
        }
        if (kundeForm.L === true) {
            interessen.push('L');
        }
        if (kundeForm.R === true) {
            interessen.push('R');
        }

        const umsatz: Umsatz = {
            betrag: kundeForm.betrag,
            waehrung: kundeForm.waehrung,
        };

        const user: User = {
            username: kundeForm.username,
            password: kundeForm.password,
        };

        const adresse: Adress = {
            plz: kundeForm.plz,
            ort: kundeForm.ort,
        };

        const kunde = new Kunde(
            kundeForm.id,
            kundeForm.nachname,
            kundeForm.email,
            kundeForm.kategorie,
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            umsatz,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            interessen,
            adresse,
            user,
            kundeForm.version,
        );

        kunde.umsatz.waehrung = 'EUR';
        kunde.umsatz.betrag = 0;

        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }
    /**
     * Abfrage, ob im Buchtitel der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Buchtitel enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase());
    }

    /**
     * Abfrage, ob das Buch dem angegebenen Verlag zugeordnet ist.
     * @param verlag der Name des Verlags
     * @return true, falls das Buch dem Verlag zugeordnet ist. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined || this.interessen === null) {
            return false;
        }
        return this.interessen.length !== 0;
    }
    hasInteresse(interesse: string) {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.includes(interesse);
    }
    updateInteressen(lesen: boolean, reisen: boolean, sport: boolean) {
        this.resetInteressen();
        if (lesen) {
            this.addInteresse('L');
        }
        if (reisen) {
            this.addInteresse('R');
        }
        if (sport) {
            this.addInteresse('S');
        }
    }
    private resetInteressen() {
        this.interessen = [];
    }
    private addInteresse(interesse: string) {
        if (this.interessen === undefined) {
            this.interessen = [];
        }
        this.interessen.push(interesse);
    }
    hasGeschlecht(geschlecht: string) {
        return this.geschlecht === geschlecht;
    }

    updateStammdaten(
        nachname: string | undefined,
        email: string,
        kategorie: number | undefined,
        newsletter: boolean | undefined,
        umsatz: Umsatz | undefined,
        homepage: URL | undefined,
        geschlecht: GeschlechtType | undefined | '',
        familienstand: FamilienstandType | undefined,
        adresse: Adress,
    ) {
        this.nachname = nachname;
        this.email = email;
        this.kategorie = kategorie;
        this.newsletter = newsletter;
        this.umsatz = umsatz;
        this.homepage = homepage;
        this.geschlecht = geschlecht;
        this.familienstand = familienstand;
        this.adresse = adresse;
    }
    hasNoGeschlecht() {
        if (this.geschlecht === undefined) {
            return console.error('Geschlecht cant be undefined!');
        }
    }
    toJSON(): KundeServer {
        return {
            id: this.id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum: this.geburtsdatum,
            umsatz: this.umsatz,
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: this.adresse,
            user: this.user,
        };
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}
