import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';



const baseUrl = environment.BACKEND_URL;


@Injectable({
  providedIn: 'root'
})
export class HelloApiService {

  private readonly helloURL = `${baseUrl}/api/v1/hello`;

  constructor(private http: HttpClient) {}

  getSessionId(){
    const sessionIdUrl = `${(this.helloURL)}/get-session-id`;
    return this.http.get(sessionIdUrl, { responseType: 'text' });
  }

}
