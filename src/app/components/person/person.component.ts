import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Selector, select } from '@ngrx/store';
import {take, filter} from 'rxjs/operators';
import * as peopleActions from '../people-ngrx/ngrx/actions/people.actions';
import * as peopleSelectors from '../people-ngrx/ngrx/selectors/people.selectors';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person$ = this.store.pipe(select(peopleSelectors.getPerson));
  loaded$ = this.store.pipe(select(peopleSelectors.isPersonLoaded));

  constructor(private activeRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.activeRoute.params.pipe(take(1), filter(params => !!params.id))
      .subscribe(params => this.store.dispatch(peopleActions.loadPerson(params.id)));
  }

}
