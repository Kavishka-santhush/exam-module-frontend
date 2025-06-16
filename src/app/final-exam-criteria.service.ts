import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinalExamCriteria } from './models/final-exam-criteria.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalExamCriteriaService {
  private apiUrl = `${environment.BACKEND_URL}/api/final-exam-criteria`;

  constructor(private http: HttpClient) { }

  getAllFinalExamCriteria(): Observable<FinalExamCriteria[]> {
    return this.http.get<FinalExamCriteria[]>(this.apiUrl);
  }

  getFinalExamCriteriaById(id: number): Observable<FinalExamCriteria> {
    return this.http.get<FinalExamCriteria>(`${this.apiUrl}/${id}`);
  }

  createFinalExamCriteria(criteria: FinalExamCriteria): Observable<FinalExamCriteria> {
    return this.http.post<FinalExamCriteria>(this.apiUrl, criteria);
  }

  updateFinalExamCriteria(id: number, criteria: FinalExamCriteria): Observable<FinalExamCriteria> {
    return this.http.put<FinalExamCriteria>(`${this.apiUrl}/${id}`, criteria);
  }

  deleteFinalExamCriteria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDistinctGrades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/grades`);
  }
}
