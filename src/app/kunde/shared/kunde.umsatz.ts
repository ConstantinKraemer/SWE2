export default class Umsatz {
    constructor(
        public betrag: number,
        public waehrung: string,
    ){
        this.betrag = betrag
        this.waehrung = waehrung
    }
}