import { Pipe, PipeTransform } from '@angular/core';
import { Personeel } from './personeel/personeel.model';

@Pipe({
  name: 'personeelFilter',
})
export class PersoneelFilterPipe implements PipeTransform {
  transform(personeels: Personeel[], name: string): Personeel[] {
    if (!name || name.length === 0) {
      return personeels;
    }
    return personeels.filter((rec) =>
      rec.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }
}
