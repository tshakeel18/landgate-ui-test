import { createReducer, on } from '@ngrx/store';
import * as PeopleActions from '../actions/people.actions';
import { PersonModel } from 'src/app/models/person-model';

export const peopleFeatureKey = 'people';

// TODO: Need to add People to the store and initialize it.
export interface State {
  people?: PersonModel[];
  person?: PersonModel;
  peopleLoaded?: boolean;
  peopleLoadingError?: string;
  personLoaded?: boolean;
  isUpdating?: boolean;
}

export const initialState: State = {
  peopleLoaded : false,
  personLoaded: false
};


export const reducer = createReducer(
  initialState,

  on(PeopleActions.loadPeoples, state => ({...state, peopleLoaded: false, peopleLoadingError: ''})),

  on(PeopleActions.loadedPeople, (state, {people}) => ({...state, peopleLoaded: true, people, peopleLoadingError: ''})),

  on(PeopleActions.loadedPeopleError, (state, {error}) => ({...state, peopleLoaded: true, peopleLoadingError: error})),

  on(PeopleActions.loadPerson, (state) => ({...state, personLoaded: false})),

  on(PeopleActions.loadPersonSuccess, (state, {person}) => ({...state, personLoaded: true, person})),

  on(PeopleActions.deletedPerson, (state, {id}) => ({...state, people: state.people.filter(item => item.id !== id)})),

  on(PeopleActions.updatePerson, (state) => ({...state, isUpdating: true})),

  on(PeopleActions.updatedPerson, (state, {person}) => ({...state, isUpdating: false, people: state.people.map((item, index) => {
    if (item.id === person.id) {
      return person;
    }
    return item;
  })})),
);

