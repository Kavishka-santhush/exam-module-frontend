

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamService {
  private baseURL = environment.BACKEND_URL;
  private apiUrl = `${this.baseURL}/api/v1/schedule`;
  private programUrl = `${this.baseURL}/api/programs`;
  private subjectUrl = `${this.baseURL}/api/subject`;
  private examTypeUrl = `${this.baseURL}/api/examtypes`;
  private locationUrl = `${this.baseURL}/api/v1/location`;

  constructor(private http: HttpClient) {}

  scheduleExam(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllScheduledExams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateExam(exam: any) {
    return this.http.put(`${this.apiUrl}/${exam.id}`, exam);
  }

  deleteExam(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPrograms(): Observable<any[]> {
    return this.http.get<any[]>(this.programUrl);
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.subjectUrl);
  }

  getSubjectsByProgram(programId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.subjectUrl}/byProgram/${programId}`);
  }

  getExamTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.examTypeUrl);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.locationUrl);
  }

  getExamTypesByProgram(programId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.examTypeUrl}/program/${programId}`);
  }
}
