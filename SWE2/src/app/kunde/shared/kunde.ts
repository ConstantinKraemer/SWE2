// tslint:disable:max-file-line-count
import * as moment from 'moment'
import 'moment/locale/de'
import Umsatz from './kunde.umsatz'
// Alternativen zu Moment
//  https://github.com/date-fns/date-fns
//      https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189
//  https://github.com/moment/luxon
//  https://github.com/iamkun/dayjs

moment.locale('de')

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

/* export interface Umsatz {
    betrag: number,
    waehrung: string,
} */
export interface Adress {
    plz: string,
    ort: string,
}

export interface User {
    username: string
    password: string
}
/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundedaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    id?: string
    nachname?: string
    email: string
    kategorie?: number
    newsletter?: boolean
    geburtsdatum?: Date
    umsatz?: Umsatz
    homepage?: URL
    geschlecht: GeschlechtType
    familienstand?: FamilienstandType
    username?: string
    adresse: Adress
    user?: User
    version?: number
}

interface Href {
    href: string
}

interface SelfLink {
    self: Href
}
/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    interessen?: Array<string>
    links?: any
    _links?: SelfLink
}

export interface KundeForm extends KundeShared {
    betrag: number
    waehrung: string
    plz: string
    ort: string
    kategorie: number
    username: string
    password: string
    S?: boolean
    L?: boolean
    R?: boolean
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
    ratingArray: Array<boolean> = []

    // wird aufgerufen von fromServer() oder von fromForm()
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
        public geschlecht: GeschlechtType,
        public familienstand: FamilienstandType | undefined,
        public interessen: Array<string> | undefined,
        public adresse: Adress,
        public user: User | undefined,
        public username: string | undefined,
        public version: number | undefined,
    ) {
        this.id = id
        this.nachname = nachname
        this.email = email
        this.kategorie = kategorie
        this.newsletter = newsletter
        this.geburtsdatum = geburtsdatum
        this.umsatz =
            umsatz !== undefined ? umsatz : this.umsatz = new Umsatz(0, 'EUR')
        this.geschlecht = geschlecht
        this.familienstand = familienstand
        this.interessen = interessen
        this.adresse = adresse
        this.user = user
        this.username = username
        this.version = version || undefined
    }
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined
        if (kundeServer.links !== undefined) {
            // innerhalb von einem JSON-Array
            selfLink = kundeServer.links[1].href
        } else if (kundeServer._links !== undefined) {
            // ein einzelnes JSON-Objekt
            selfLink = kundeServer._links.self.href
        }
        let id: string | undefined
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/')
            id = selfLink.substring(lastSlash + 1)
        }
        let version: number | undefined
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1)
            version = Number.parseInt(versionStr, 10)
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
            kundeServer.username,
            version,
        )
        console.log('Kunde.fromServer(): kunde=', kunde)
        return kunde
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param buch JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(kundeForm: KundeForm) {

        const interessen: Array<string> = []
        if (kundeForm.S === true) {
            interessen.push('S')
        }
        if (kundeForm.L === true) {
            interessen.push('L')
        }
        if (kundeForm.R === true) {
            interessen.push('R')
        }

        const umsatz: Umsatz = {
            betrag: kundeForm.betrag,
            waehrung: kundeForm.waehrung,
        }

        const user: User = {
            username: kundeForm.username,
            password: kundeForm.password,
        }

        const adresse: Adress = {
            plz: kundeForm.plz,
            ort: kundeForm.ort,
        }

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
            kundeForm.username,
            kundeForm.version,
        )
        console.log('Kunde.fromForm(): kunde=', kunde)
        return kunde
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
            : this.nachname.toLowerCase().includes(nachname.toLowerCase())
    }

    /**
     * Abfrage, ob das Buch dem angegebenen Verlag zugeordnet ist.
     * @param verlag der Name des Verlags
     * @return true, falls das Buch dem Verlag zugeordnet ist. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined) {
            return false
        }
        return this.interessen.length !== 0
    }

    /**
     * Aktualisierung der Stammdaten des Buch-Objekts.
     * @param titel Der neue Buchtitel
     * @param rating Die neue Bewertung
     * @param art Die neue Buchart (DRUCKAUSGABE oder KINDLE)
     * @param verlag Der neue Verlag
     * @param preis Der neue Preis
     * @param rabatt Der neue Rabatt
     */
    updateStammdaten(
        nachname: string | undefined,
        email: string,
        kategorie: number | undefined,
        newsletter: boolean | undefined,
        umsatz: Umsatz | undefined,
        homepage: URL | undefined,
        geschlecht: GeschlechtType,
        familienstand: FamilienstandType | undefined,
        interessen: Array<string> | undefined,
        plz: string,
        ort: string,
    ) {
        this.nachname = nachname
        this.email = email
        this.kategorie = kategorie
        this.newsletter = newsletter
        this.umsatz = umsatz
        this.homepage = homepage
        this.geschlecht = geschlecht
        this.familienstand = familienstand
        this.interessen = interessen
        this.adresse.plz = plz
        this.adresse.ort = ort
        this.version = 1
    }
    hasNoGeschlecht() {
        if (this.geschlecht === undefined) {
            return console.error('Geschlecht cant be undefined!')
        }
    }

    /**
     * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
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
            version: this.version,
        }
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }
}
