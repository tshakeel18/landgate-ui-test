import { createAction, props } from '@ngrx/store';
import {PersonModel} from '../../../../models/person-model';

// This is a request
export const loadPeoples = createAction(
  '[People] Load Peoples'
);

// This is a load success
export const loadedPeople = createAction(
  '[People] Loaded',
  (people: PersonModel[]) => ({people})
);

export const loadedPeopleError = createAction(
  '[People] Load Failure',
  (error: string) => ({error})
);

export const loadPerson = createAction(
  '[Person] Load Person',
  (id: number) => ({id})
);

export const loadPersonSuccess = createAction(
  '[Person] Loaded',
  (person: PersonModel) => ({person})
);

export const updatePerson = createAction(
  '[Person] Update',
  (person: PersonModel) => ({person})
);

export const updatedPerson = createAction(
  '[Person] Updated',
  (person: PersonModel) => ({person})
);

export const deletePerson = createAction(
  '[Person] Delete',
  (id: number) => ({id})
);

export const deletedPerson = createAction(
  '[Person] Deleted',
  (id: number) => ({id})
);




