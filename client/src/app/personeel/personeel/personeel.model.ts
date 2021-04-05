interface PersoneelJson {
    id: number;
    name: string;
    functie: string;
    geboorteDatum: Date;
    datumInDienst : Date;
     email: string;
     telefoonNummer: string;
     postcode : string,
     straat: string,
     huisnummer: string,
     land: string
  }
export class Personeel {
    constructor(
        private _id: number,
        private _name: string,
        private _functie : string,
        private _geboorteDatum : Date,
        private _datumIndienst : Date,
        private _email: string,
        private _telefoonNummer: string,
        private  _postcode: string,
        private _straat: string,
        private _huisnummer: string,
        private _land: string
      ) {}
      static fromJSON(json: PersoneelJson): Personeel {
        const pers = new Personeel(
          json.id,
          json.name,
          json.functie,
          json.geboorteDatum,
          json.datumInDienst,
          json.email,
          json.telefoonNummer,
          json.postcode,
          json.straat,
          json.huisnummer,
          json.land


        );
        return pers;
      }
      toJSON(): PersoneelJson{
        return <PersoneelJson>{
         
          name: this.name,
          functie: this.functie,
          geboorteDatum: this.geboorteDatum,
          datumInDienst: this.datumInDienst,
          email: this.email,
          telefoonNummer: this.telefoonNummer,
          postcode: this.postcode,
          straat: this.straat,
          huisnummer: this.huisnummer,
          land:  this.land
        };
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
      get email(): string{
        return this._email;
      }
      get telefoonNummer(): string{
        return this._telefoonNummer;
      }
      get postcode(): string{
        return this._postcode;
      }
      get straat(): string{
        return this._straat;
      }
      get huisnummer(): string{
        return this._huisnummer;
      }
      get land(): string{
        return this._land;
      }
}
