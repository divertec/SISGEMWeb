import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)/*: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree */ {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // Sí esta logeado retorna true
      return true;
    }
    // No logeado, retorna al login 
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return true;
  }



}
