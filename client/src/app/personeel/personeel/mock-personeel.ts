import { Personeel } from './personeel.model';

const JsonMedewerkers= [
  {
    id: 1,
    name: 'Jonas',
    functie: 'Keuken',
    geboorteDatum: new Date("2000-05-04"),
    datumInDienst : new Date("2019-01-16"),
  },
  {
    id: 2,
    name: 'lorum',
    functie: 'Zaal',
    geboorteDatum: new Date("1970-05-03"),
    datumInDienst : new Date("1990-01-16"),
  },
  {
    id: 3,
    name: 'lorum',
    functie: 'Zaal',
    geboorteDatum: new Date("1979-12-03"),
    datumInDienst : new Date("1998-01-16"),
  },
];
export const PERSONEEL: Personeel[] = JsonMedewerkers.map(Personeel.fromJSON);