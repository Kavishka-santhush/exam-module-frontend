import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {}

  signOut(): void {
    [localStorage, sessionStorage].forEach(storage => {
      storage.removeItem(TOKEN_KEY);
      storage.removeItem(USER_KEY);
      storage.clear();
    });
  }

  saveToken(token: string): void {
    console.log("token authenticated");
    this.setItemInBothStorages(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY) || this.getFromLocalAndUpdateSession(TOKEN_KEY);
  }

  saveUser(user: any): void {
    console.log("user authenticated");
    const userStr = JSON.stringify(user);
    this.setItemInBothStorages(USER_KEY, userStr);
  }

  getUser(): any {
    const user = sessionStorage.getItem(USER_KEY) || this.getFromLocalAndUpdateSession(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem(USER_KEY);
  }

  private updateSessionStorage(): void {
    [USER_KEY, TOKEN_KEY].forEach(key => {
      const value = localStorage.getItem(key);
      if (value) sessionStorage.setItem(key, value);
    });
  }

  private setItemInBothStorages(key: string, value: string): void {
    [localStorage, sessionStorage].forEach(storage => {
      storage.removeItem(key);
      storage.setItem(key, value);
    });
  }

  private getFromLocalAndUpdateSession(key: string): string | null {
    const value = localStorage.getItem(key);
    if (value) sessionStorage.setItem(key, value);
    return value;
  }
}
