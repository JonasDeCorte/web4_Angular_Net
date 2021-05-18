//mport { Personeel } from "app/personeel/personeel/personeel.model";

export interface BewonerJson {
    id: number;
    name: string;
    geboorteDatum: Date;
    eetOpKamer: boolean;
    wordtGehaald: boolean;
   // personeel: Personeel;
  }
export class Bewoner {
    private _id: number
    constructor(
        private _name: string,
        private _geboorteDatum : Date,
        private _eetOpKamer: boolean,
        private _wordtGehaald: boolean,
       // private _personeel: Personeel,  
      ) {}
      static fromJSON(json: BewonerJson): Bewoner {
        const bewoner = new Bewoner(
          json.name,
          json.geboorteDatum,
          json.eetOpKamer,
          json.wordtGehaald,
          //json.personeel,
        );
        bewoner._id = json.id;
        return bewoner;
      }
      toJSON(): BewonerJson{
        return <BewonerJson>{
          name: this._name,
          geboorteDatum: this._geboorteDatum,
          eetOpKamer: this._eetOpKamer,
          wordtGehaald: this._wordtGehaald,
         // personeel: this._personeel,        
        };
      }
      get id() : number{
        return this._id;
    }
    get name(): string{
        return this._name;
    }
    set name(name : string){this._name = name;}
    get geboorteDatum(): Date{
        return this._geboorteDatum;
    }
    set geboorteDatum(geboorteDatum : Date){this._geboorteDatum = geboorteDatum;}
    get eetOpKamer(): boolean{
        return this._eetOpKamer;
    }
    set eetOpKamer(eetOpKamer : boolean){this._eetOpKamer = eetOpKamer;}
    get wordtGehaald(): boolean{
        return this._wordtGehaald;
    }
    set wordtGehaald(wordtGehaald : boolean){this._wordtGehaald = wordtGehaald;}
  /*   get personeel(): Personeel {return this._personeel;}
    set personeel(persoon: Personeel){this._personeel = persoon;}
     */
}