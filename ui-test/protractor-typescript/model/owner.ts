export default class Owner {
  name: string;
  address: string;
  city: string;
  telephone: string;

  constructor(name?: string, address?: string, city?: string, telephone?: string) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.telephone = telephone;
  }
}
