import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, catchError } from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as PeopleActions from '../actions/people.actions';
import { PeopleService } from 'src/app/services/people.service';


@Injectable()
export class PeopleEffects {

  loadPeoples$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.loadPeoples),
      // TODO Implement a Load People Action that gets the data from the service.
      concatMap(() =>
      this.service.getPeople().pipe(
        map((people) => PeopleActions.loadedPeople(people)),
        catchError(() => of(PeopleActions.loadedPeopleError('Something went wrong')))
      ))
    );
  });

  loadPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.loadPerson),
      // TODO Implement a Load People Action that gets the data from the service.
      concatMap((action) =>
      this.service.getPerson(action.id).pipe(
        map((person) => PeopleActions.loadPersonSuccess(person))
      ))
    );
  });

  updatePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.updatePerson),
      // TODO Implement a Load People Action that gets the data from the service.
      concatMap((action) =>
      this.service.updatePerson(action.person).pipe(
        map((person) => PeopleActions.updatedPerson(person))
      ))
    );
  });

  deletePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.deletePerson),
      // TODO Implement a Load People Action that gets the data from the service.
      concatMap((action) =>
      this.service.deletePerson(action.id).pipe(
        map((id) => PeopleActions.deletedPerson(id))
      ))
    );
  });

  constructor(private actions$: Actions, private readonly service: PeopleService) {}

}
