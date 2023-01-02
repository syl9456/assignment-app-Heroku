import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(private http:HttpClient,
              private tokenStorageService:TokenStorageService) { }

  //private AUTH_API = 'http://localhost:8020/api_auth/auth/';
  private url = 'https://api-auth-render.onrender.com/api_auth/auth/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })
  };


  login(credentials): Observable<any> {
    return this.http.post(this.url + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, this.httpOptions);
  }

  register(user){
    return this.http.post(this.url + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, this.httpOptions);
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
