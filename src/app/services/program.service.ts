import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:2000/api';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

 
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
  getAllPrograms(): Observable<any> {
    return this.http.get(`${API_URL}/programs`, { headers: this.getHeaders() });
  }

  getProgramById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/programs/${id}`, { headers: this.getHeaders() });
  }

  createProgram(program: any): Observable<any> {
    return this.http.post(`${API_URL}/programs`, program, { headers: this.getHeaders() });
  }

  updateProgram(id: number, program: any): Observable<any> {
    return this.http.put(`${API_URL}/programs/${id}`, program, { headers: this.getHeaders() });
  }

  deleteProgram(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/programs/${id}`, { headers: this.getHeaders() });
  }

  
  getAllExamTypes(): Observable<any> {
    return this.http.get(`${API_URL}/examtypes`, { headers: this.getHeaders() });
  }

  getExamTypesByProgramId(programId: number): Observable<any> {
    return this.http.get(`${API_URL}/examtypes/program/${programId}`, { headers: this.getHeaders() });
  }

  getExamTypeById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/examtypes/${id}`, { headers: this.getHeaders() });
  }

  createExamType(examType: any): Observable<any> {
    return this.http.post(`${API_URL}/examtypes`, examType, { headers: this.getHeaders() });
  }

  updateExamType(id: number, examType: any): Observable<any> {
    return this.http.put(`${API_URL}/examtypes/${id}`, examType, { headers: this.getHeaders() });
  }

  deleteExamType(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/examtypes/${id}`, { headers: this.getHeaders() });
  }
}
