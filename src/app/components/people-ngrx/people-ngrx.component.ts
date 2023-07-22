import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as peopleActions from './ngrx/actions/people.actions';
import * as peopleSelectors from './ngrx/selectors/people.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonModel } from 'src/app/models/person-model';

@Component({
  selector: 'app-people-component',
  templateUrl: './people-ngrx.component.html',
  styleUrls: ['./people-ngrx.component.scss']
})
export class PeopleNgrxComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  people$ = this.store.pipe(select(peopleSelectors.getPeople));
  isLoaded$ = this.store.pipe(select(peopleSelectors.isPeopleLoaded));
  error$ = this.store.pipe(select(peopleSelectors.peopleLoadingError));
  isUpdating$ = this.store.pipe(select(peopleSelectors.isUpdating));
  editableRowId: number;
  public formGroup: FormGroup;
  // TODO: Include the Store and get the data from the NgrxStore
  constructor(private readonly store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.isUpdating$.pipe(takeUntil(this.destroy$)).subscribe(isUpdating => {
      if (!isUpdating) {
        this.editableRowId = null;
        this.formGroup?.reset();
      }
    });
    this.store.dispatch(peopleActions.loadPeoples());
    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      jobTitle: [''],
    });
  }

  onDelete(id: number, event: MouseEvent) {
    this.store.dispatch(peopleActions.deletePerson(id));
    event.stopPropagation();
  }

  onEdit(person: PersonModel, event: MouseEvent) {
    this.editableRowId = person.id;
    this.formGroup.setValue({
      firstName: person.firstName,
      lastName: person.lastName,
      age: person.age,
      jobTitle: person.jobTitle,
    });
    event.stopPropagation();
  }

  onCancel(event: MouseEvent) {
    this.formGroup.reset();
    this.editableRowId = null;
    event.stopPropagation();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.store.dispatch(peopleActions.updatePerson({...this.formGroup.value, id: this.editableRowId}));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
