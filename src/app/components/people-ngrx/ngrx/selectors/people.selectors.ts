import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPeople from '../reducers/people.reducer';

export const selectPeopleState = createFeatureSelector<fromPeople.State>(
  fromPeople.peopleFeatureKey
);

// TODO: need to add a selector for people.
export const getPeople = createSelector(selectPeopleState, (state: fromPeople.State) => state.people);

export const isPeopleLoaded = createSelector(selectPeopleState, (state: fromPeople.State) => state.peopleLoaded);

export const peopleLoadingError = createSelector(selectPeopleState, (state: fromPeople.State) => state.peopleLoadingError);

export const getPerson = createSelector(selectPeopleState, (state: fromPeople.State) => state.person);

export const isPersonLoaded = createSelector(selectPeopleState, (state: fromPeople.State) => state.personLoaded);

export const isUpdating = createSelector(selectPeopleState, (state: fromPeople.State) => state.isUpdating);
