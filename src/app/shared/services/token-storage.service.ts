import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveToken(token: string): void {    
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any): void {  
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log("getUser() : " + user);
      return JSON.parse(user);
    }
    return {};
  }

  public getRoles(): any {
    const user = this.getUser();
    const roles = user.roles;
    if (roles) {
      console.log("getRoles() : " + roles);
      return user.roles;
    }
    return {};
  }

}
