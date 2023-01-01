import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8020/api_auth/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient,
              private tokenStorageService:TokenStorageService) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user){
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  //fonctions qui retourne un booléen si l'utilisateur est admin, user, moderatoeur ou non, en regardant son role
  isAdmin(): boolean {
    if(!!this.tokenStorageService.getToken()){
      if(this.tokenStorageService.getRoles().includes("ROLE_ADMIN")){
        return true;
      } else {
        return false;
      }
    } else return false;
  }
  

  isUser(): boolean {
    if(!!this.tokenStorageService.getToken()){
      if(this.tokenStorageService.getRoles().includes("ROLE_USER")){
        return true;
      } else {
        return false;
      }
    } else return false;
  }
    
  isModerator(): boolean {
    if(!!this.tokenStorageService.getToken()){
      if(this.tokenStorageService.getRoles().includes("ROLE_MODERATOR")){
        return true;
      }
      else {
        return false;
      }
    } else return false;
  }
}
