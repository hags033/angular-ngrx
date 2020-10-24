import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserState } from '../../store/user.reducer';
import { addUser } from '../../store/user.actions';
import { users } from '../../store/user.selectors';

import { UserModel } from './user-model';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {
  addUserForm: FormGroup;
  users$: Observable<Array<UserModel>>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<UserState>
  ) {
    this.users$ = this.store.select(users);
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: [null, Validators.required],
      friends: [null, Validators.required],
      age: [null, Validators.required],
      weight: [null, Validators.required]
    });
  }

  submit(form: NgForm): void {
    if (!this.addUserForm.valid) {
      return;
    }
    const user: UserModel = {
      name: this.addUserForm.value.name,
      friends: this.addUserForm.value.friends,
      age: this.addUserForm.value.age,
      weight: this.addUserForm.value.weight
    };
    this.store.dispatch(addUser({ user }));
    form.resetForm();
  }
}
