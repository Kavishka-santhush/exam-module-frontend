import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private tokenStorage: TokenStorageService) {}

  canActivate(): boolean {
    if (this.tokenStorage.isUserAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']).then(value => {
      window.location.reload();
    });
    return false;
  }
}
