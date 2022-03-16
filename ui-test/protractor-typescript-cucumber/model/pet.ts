export default class Pet {
  name: string;
  dob: string;
  type: string;

  constructor(name?: string, dob?: string, type?: string) {
    this.name = name;
    this.dob = dob;
    this.type = type;
  }
}
