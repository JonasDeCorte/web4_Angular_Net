import { ThrowStmt } from "@angular/compiler";

interface PersoneelJson {
    id: number;
    name: string;
    functie: string;
    geboorteDatum: Date;
    datumInDienst : Date;
  }
export class Personeel {
    constructor(
        private _id: number,
        private _name: string,
        private _functie : string,
        private _geboorteDatum : Date,
        private _datumIndienst : Date
      ) {}
      static fromJSON(json: PersoneelJson): Personeel {
        const pers = new Personeel(
          json.id,
          json.name,
          json.functie,
          json.geboorteDatum,
          json.datumInDienst
        );
        return pers;
      }
      get id() : number{
          return this._id;
      }
      get name(): string{
          return this._name;
      }
      get functie():string{
          return this._functie;
      }
      get geboorteDatum(): Date{
          return this._geboorteDatum;
      }
      get datumInDienst(): Date{
          return this._datumIndienst;
      }
}
