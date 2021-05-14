import { Bewoner, BewonerJson } from "app/bewoner/bewoner.model";
interface PersoneelJson {
    id: number;
    name: string;
    functie: string;
    geboorteDatum: Date;
    datumInDienst : Date;
     email: string;
     telefoonNummer: string;
     bewoners: BewonerJson[];
  }
export class Personeel {
  private _id: number; 
  constructor(
        private _name: string,
        private _functie : string,
        private _geboorteDatum :Date,
        private _datumIndienst :Date,
        private _email: string,
        private _telefoonNummer: string,
        private _bewoners = new Array<Bewoner>()
      ) {}
      static fromJSON(json: PersoneelJson): Personeel {
        const pers = new Personeel(
          json.name,
          json.functie,
          json.geboorteDatum,
          json.datumInDienst,
          json.email,
          json.telefoonNummer,
          json.bewoners.map(Bewoner.fromJSON)
        );
        pers._id = json.id;
        return pers;
      }
      toJSON(): PersoneelJson{
       // id: this.id,
        return <PersoneelJson>{
          name: this.name,
          functie: this.functie,
          geboorteDatum: this.geboorteDatum,
          datumInDienst: this.datumInDienst,
          email: this.email,
          telefoonNummer: this.telefoonNummer,
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
   
      get bewoners(): Bewoner[] {
        return this._bewoners;
      }
      addBewoner(bewoner: Bewoner) {
        this._bewoners.push(bewoner);
      }
}
