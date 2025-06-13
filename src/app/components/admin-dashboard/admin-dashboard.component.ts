import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  implements OnInit {

  students: any[] = [];
  private apiUrl = `${environment.BACKEND_URL}/api/v1/marks`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMarks();
  }

  async loadMarks() {
    try {
      const data = await firstValueFrom(this.http.get<any[]>(this.apiUrl));
      this.students = data;
    } catch (error) {
      console.error('Error loading marks:', error);
    }
  }

}











