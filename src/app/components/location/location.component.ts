import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

interface Location {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  location: Location = new class implements Location {
    id: number = 0;
    name: string = '';
  }
  subjects: Location[] = [];
  isEditMode = false;
  editingId?: number;

  private apiUrl = 'http://localhost:2000/api/v1/location';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLocations();
  }


  addLocation(form: NgForm): void {
    if (form.valid) {
      this.http.post<Location>(this.apiUrl, this.location).subscribe({
        next: () => {
          alert('Location added successfully!');
          this.resetForm(form);
          this.loadLocations();
        },
        error: (err) => {
          console.error('Failed to add location', err);
          alert('Failed to add location.');
        }
      });
    }
  }


  loadLocations(): void {
    this.http.get<Location[]>(this.apiUrl).subscribe({
      next: (data) => (this.subjects = data),
      error: (err) => {
        console.error('Failed to load locations', err);
        this.subjects = [];
      }
    });
  }

  editLocation(id: number, location_: Location): void {
    if (!id) return;
    this.location = location_;
    this.isEditMode = true;
    this.editingId = id;
  }

  updateLocation(): void {
    if (!this.editingId) return;
    this.http.put(`${this.apiUrl}/${this.editingId}`, this.location).subscribe({
      next: () => {
        alert('Location updated successfully!');
        this.isEditMode = false;
        this.editingId = undefined;
        this.location = { name: '' };
        this.loadLocations();
      },
      error: (err) => {
        console.error('Failed to update location', err);
        alert('Failed to update location.');
      }
    });
  }

  deleteLocation(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this location?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        alert('Location deleted successfully!');
        this.loadLocations();
      },
      error: (err) => {
        console.error('Failed to delete location', err);
        alert('Failed to delete location.');
      }
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingId = undefined;
    this.location = { name: '' };
  }

  private resetForm(form: NgForm): void {
    form.resetForm();
    this.location = { name: '' };
    this.isEditMode = false;
    this.editingId = undefined;
  }

  protected readonly Number = Number;
}
