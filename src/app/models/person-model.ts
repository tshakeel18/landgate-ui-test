export class PersonModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public age: number;
  public jobTitle: string;

  constructor(dataIn: any) {
    // TODO: Implement a dataIn object that gets passed in as a JavaScript Object
    this.id = dataIn.id;
    this.firstName = dataIn.firstName;
    this.lastName = dataIn.lastName;
    this.age = dataIn.age;
    this.jobTitle = dataIn.jobTitle;
  }
}
