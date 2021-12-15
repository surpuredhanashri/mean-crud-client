import { LocalstorageService } from './../services/localstorage.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  AuthMessage = 'Email or Password is Wrong';

  constructor(private router: Router, private UserService: UserService, private LocalstorageService:LocalstorageService) {}
  ngOnInit() {
    this._initloginForm();
  }

  private _initloginForm() {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.UserService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe(

      data => {
        this.authError = false;
        this.LocalstorageService.setToken(data.token);
        console.log(data);
        this.router.navigate(['/home']);

      },
      error => {
        this.authError = true;
        console.log(error);
      } 
    );
  }

}
