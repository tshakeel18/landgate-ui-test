import {NgModule} from '@angular/core';
import {PeopleNgrxComponent} from './people-ngrx.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromPeople from './ngrx/reducers/people.reducer';
import {PeopleEffects} from './ngrx/effects/people.effects';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PersonComponent } from '../person/person.component';

const routes: Routes = [
  {path: '', component: PeopleNgrxComponent},
  {path: ':id', component: PersonComponent},
];

@NgModule({
  declarations: [PeopleNgrxComponent],
  exports: [PeopleNgrxComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature(fromPeople.peopleFeatureKey, fromPeople.reducer),
    EffectsModule.forFeature([PeopleEffects]),
    RouterModule.forChild(routes)
  ]
})
export class PeopleNgrxModule {
}
