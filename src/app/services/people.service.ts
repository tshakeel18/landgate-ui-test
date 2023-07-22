import { Injectable } from '@angular/core';
import {delay, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {PersonModel} from '../models/person-model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor() { }

  private mockPeopleList = [
    {firstName: 'John', lastName: 'Doe', age: '21', workTitle: 'Wanna be Signer'},
    {firstName: 'Jane', lastName: 'Doe', age: '22', workTitle: 'Signer'},
    {firstName: 'Bob', lastName: 'Barker', age: '80', workTitle: 'TV Host'},
    {firstName: 'John', lastName: 'Doe', age: '21', workTitle: 'Wanna be Signer'},
  ];


  getPeople(): Observable<PersonModel[]> {
    // TODO: Finish this implementation using the data from mockPeopleList
    // of(true).pipe(delay(100))
    return of(this.mockPeopleList).pipe(delay(1000),
      map(data => data.map((item, index) => this.mapPersonModel(item, index + 1))),
    );
  }

  getPerson(id: number): Observable<PersonModel> {
    // TODO: Finish this implementation using the data from mockPeopleList
    // of(true).pipe(delay(100))
    return of(this.mockPeopleList[id - 1]).pipe(delay(1000), map(item => this.mapPersonModel(item, id)));
  }

  updatePerson(person: PersonModel): Observable<PersonModel> {
    this.mockPeopleList.forEach((item, index) => {
      if (person.id === index + 1) {
        item.age = String(person.age);
        item.firstName = person.firstName;
        item.lastName = person.lastName;
        item.workTitle = person.jobTitle;
      }
    });
    return of(new PersonModel(person)).pipe(delay(1000));
  }

  deletePerson(id: number): Observable<number> {
    this.mockPeopleList.splice(id - 1, 1);
    return of(id).pipe(delay(1000));
  }

  private mapPersonModel(item: any, index: number) {
    return new PersonModel({...item, id: index , age: Number(item.age), jobTitle: item.workTitle});
  }
}
