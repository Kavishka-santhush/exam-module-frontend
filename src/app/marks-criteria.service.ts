import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from './models/program.model';
import { Component } from './models/component.model';
import { MarksCriteria } from './models/marks-criteria.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarksCriteriaService {

  private apiUrl = `${environment.BACKEND_URL}/api/marks-criteria`;

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<Program[]> {
    const programApiUrl = `${environment.BACKEND_URL}/api/programs`;
    return this.http.get<Program[]>(programApiUrl);
  }

  getAllComponents(): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.apiUrl}/components`);
  }

  getMarksCriteriaByProgram(programId: number): Observable<MarksCriteria[]> {
    return this.http.get<MarksCriteria[]>(`${this.apiUrl}/program/${programId}`);
  }

  saveMarksCriteria(criteria: MarksCriteria[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, criteria);
  }

  addNewComponent(componentName: string): Observable<Component> {
    return this.http.post<Component>(`${this.apiUrl}/components/add`, null, { params: { componentName } });
  }
}
