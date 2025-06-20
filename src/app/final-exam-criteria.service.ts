import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinalExamCriteria } from './models/final-exam-criteria.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalExamCriteriaService {
  private apiUrl = `${environment.BACKEND_URL}/api/final-exam-criteria`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllFinalExamCriteria(): Observable<FinalExamCriteria[]> {
    return this.http.get<FinalExamCriteria[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getFinalExamCriteriaById(id: number): Observable<FinalExamCriteria> {
    return this.http.get<FinalExamCriteria>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createFinalExamCriteria(criteria: FinalExamCriteria): Observable<FinalExamCriteria> {
    return this.http.post<FinalExamCriteria>(this.apiUrl, criteria, { headers: this.getHeaders() });
  }

  updateFinalExamCriteria(id: number, criteria: FinalExamCriteria): Observable<FinalExamCriteria> {
    return this.http.put<FinalExamCriteria>(`${this.apiUrl}/${id}`, criteria, { headers: this.getHeaders() });
  }

  deleteFinalExamCriteria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getDistinctGrades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/grades`, { headers: this.getHeaders() });
  }
}
