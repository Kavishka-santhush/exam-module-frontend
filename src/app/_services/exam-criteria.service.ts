import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';
import { GradeCriteria } from '../models/grade-criteria.model';
import { ScExamProgMarksCriteria } from '../models/sc-exam-prog-marks-criteria.model';

const API_URL = 'http://localhost:2000/api/exam-criteria';

@Injectable({
  providedIn: 'root'
})
export class ExamCriteriaService {

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${API_URL}/programs`);
  }

  getGradesAndCriteria(): Observable<GradeCriteria[]> {
    return this.http.get<GradeCriteria[]>(`${API_URL}/grades`);
  }

  getSavedCriteria(programId: number): Observable<ScExamProgMarksCriteria[]> {
    return this.http.get<ScExamProgMarksCriteria[]>(`${API_URL}/saved-criteria/${programId}`);
  }

  saveCriteriaBindings(data: { programId: number, bindings: { [key: string]: number } }): Observable<any> {
    return this.http.post(`${API_URL}/save`, data);
  }
}
