import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private localstorageService: LocalstorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const token = this.localstorageService.getToken();
    if (token) {
      const DecodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(DecodedToken.exp);

      if (!this._tokenExpired(DecodedToken.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }


  private _tokenExpired(expiry: any): boolean {
    return Math.floor(Date.now() / 1000) >= expiry;

  }
  
}
