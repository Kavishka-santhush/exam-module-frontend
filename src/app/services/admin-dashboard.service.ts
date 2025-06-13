import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseURL = environment.BACKEND_URL;
  private apiUrl = `${this.baseURL}/api/v1/marks`;

  constructor(private http: HttpClient) {}

  getAllMarks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
