import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {  UserState } from '../../store/user.reducer';

import { ScatterComponent } from './scatter.component';
import { UserModel } from '../user-input/user-model';

describe('ScatterComponent', () => {
  let component: ScatterComponent;
  let fixture: ComponentFixture<ScatterComponent>;
  let store: MockStore;
  let d3Spy: jasmine.Spy;
  const NEW_USER: UserModel = {
    name: 'Jim',
    friends: '',
    age: 34,
    weight: 165
  };
  const INITIAL_STATE: UserState = {
    users: [NEW_USER]
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterComponent ],
      providers: [provideMockStore({ initialState: INITIAL_STATE })]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    d3Spy = spyOn(component, 'drawPlot');
    component.friends = [NEW_USER];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire drawPlot', () => {
    component.ngOnInit();
    expect(d3Spy).toHaveBeenCalled();
  });
});
