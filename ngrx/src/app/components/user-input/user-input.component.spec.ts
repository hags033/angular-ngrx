import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputComponent } from './user-input.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormBuilder, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserState} from '../../store/user.reducer';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let store: MockStore;
  const INITIAL_STATE: UserState = {
    users: [{
      name: 'Jim',
      friends: '',
      age: 34,
      weight: 165
    }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInputComponent ],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState: INITIAL_STATE }), FormBuilder, NgForm]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
