import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: any;
}

const baseUrl = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authUrl = `${baseUrl}/api/v1/auth`;


  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const loginUrl = `${(this.authUrl)}/login`;
    return this.http.post<LoginResponse>(loginUrl, credentials);
  }

}
