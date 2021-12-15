import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  name?: string;

  constructor(
    private usersService: UserService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {
    this.isLoggedIn = !!this.localstorageService.getToken();
    if (this.isLoggedIn) {
      // this.localstorageService.getUser().subscribe(
      //   (user: Users) => {
      //     this.name = user.name;
      //   }
      // );
    }
  }

  logout() {
    this.usersService.logOut();
    window.location.reload();
  }
}
