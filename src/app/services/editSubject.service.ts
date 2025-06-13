import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) {}
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
    );
  }



  getAllSubjects(): Observable<any> {
    return this.http.get(`http://localhost:2000/api/v1/subject/getAllSubjects`,{headers: this.getHeaders()});
  }

  getSubjectById(Id: number): Observable<any> {
    return this.http.get(`http://localhost:2000/api/v1/subject/getSubjectById/${Id}`,{headers: this.getHeaders()});
  }

  updateSubject(Id: number): Observable<any> {
    return this.http.put(`http://localhost:2000/api/v1/subject/updateSubject`, {headers: this.getHeaders()});
  }
  addSubject(): Observable<any> {
    return this.http.post(`http://localhost:2000/api/v1/subject/createSubject`, {headers: this.getHeaders()});
  }
  deleteSubject(Id: number): Observable<any> {
    return this.http.delete(`http://localhost:2000/api/v1/subject/deleteSubject/${Id}`, {
      headers: this.getHeaders()
    });
  }


}
