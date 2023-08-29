import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
