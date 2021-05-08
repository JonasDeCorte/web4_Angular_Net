import { Bewoner, BewonerJson } from "app/bewoner/bewoner.model";


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
     land: string,
     bewoners: BewonerJson[]
  }
export class Personeel {
     constructor(
       private _id: number,
        private _name: string,
        private _functie : string,
        private _geboorteDatum :Date,
        private _datumIndienst :Date,
        private _email: string,
        private _telefoonNummer: string,
        private  _postcode: string,
        private _straat: string,
        private _huisnummer: string,
        private _land: string,
        private _bewoners = new Array<Bewoner>()
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
          json.land,
          json.bewoners.map(Bewoner.fromJSON)
        );
        return pers;
      }
      toJSON(): PersoneelJson{
        return <PersoneelJson>{
          id: this.id,
          name: this.name,
          functie: this.functie,
          geboorteDatum: this.geboorteDatum,
          datumInDienst: this.datumInDienst,
          email: this.email,
          telefoonNummer: this.telefoonNummer,
          postcode: this.postcode,
          straat: this.straat,
          huisnummer: this.huisnummer,
          land:  this.land,
          bewoners: this.bewoners.map(bewoner => bewoner.toJSON())
        };
      }
      
      get id() : number{
          return this._id;
      }
      get name(): string{
          return this._name;
      }
      set name(name : string){this._name = name;}
      get functie():string{
          return this._functie;
      }
      set functie(functie : string){this._functie = functie;}
      get geboorteDatum(): Date{
          return this._geboorteDatum;
      }
      set geboorteDatum(geboorteDatum : Date){this._geboorteDatum = geboorteDatum;}
      get datumInDienst(): Date{
          return this._datumIndienst;
      }
      set datumInDienst(datumInDienst : Date){this._datumIndienst = datumInDienst;}
      get email(): string{
        return this._email;
      }
      set email(email : string){this._email = email;}
      get telefoonNummer(): string{
        return this._telefoonNummer;
      }
      set telefoonNummer(telefoonNummer : string){this._telefoonNummer = telefoonNummer;}
      get postcode(): string{
        return this._postcode;
      }
      set postcode(postcode : string){this._postcode = postcode;}
      get straat(): string{
        return this._straat;
      }
      set straat(straat : string){this._straat = straat;}
      get huisnummer(): string{
        return this._huisnummer;
      }
      set huisnummer(huisnummer : string){this._huisnummer = huisnummer;}
      get land(): string{
        return this._land;
      }
      set land(land : string){this._land = land;}
      get bewoners(): Bewoner[] {
        return this._bewoners;
      }
      addBewoner(name: string, geboorteDatum: Date, eetOpKamer: Boolean, wordtGehaald: boolean, begeleider: Personeel) {
        this._bewoners.push(new Bewoner(name, geboorteDatum, eetOpKamer, wordtGehaald, begeleider));
      }
}
