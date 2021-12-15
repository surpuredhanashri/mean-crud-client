import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isSubmitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
    });
  }

  private _addUser(user: Users) {
    this.usersService.register(user).subscribe(
      (data) => {
        console.log(data);
        this.isSubmitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signUp() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: Users = {
      name: this.form.value.name,
      password: this.form.value.password,
      role: this.form.value.role,
    };
    this._addUser(user);
    this.route.navigate(['/login']);
  }

  get userForm() {
    return this.form.controls;
  }
}
