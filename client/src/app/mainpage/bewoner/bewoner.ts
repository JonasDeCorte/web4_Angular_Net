export class Bewoner {
    id?: number;
    firstName: string;
    age: number;
    job: string;
  
    constructor(id: number = null, 
                firstName: string = '', age: number = 0, job: string = '') {
      this.id = id;
      this.firstName = firstName;
      this.age = age;
      this.job = job;
    }
}
