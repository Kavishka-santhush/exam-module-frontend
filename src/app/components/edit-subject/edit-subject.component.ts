import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import {SubjectService} from '../../services/editSubject.service';

interface Subject{
  id: number;
  name: string;
  program:Program;
}

interface Program{
  id: number;
  name: string;
  programCode:string;
}


@Component({
  selector: 'app-edit-subject',
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: 'edit-subject.component.html',
  styleUrl: 'edit-subject.component.css'
})
export class EditSubjectComponent {
  subjectId!: number;
  subject: Subject = {
    id: 0,
    name: '',
    program: {
      id: 0,
      name: '',
      programCode:''
    }
  };

  subjects: Subject[] = [];
  isEditMode: boolean = true;
  private subjectService: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      let subjectId_ = params.get('id');

      if (!subjectId_) {
        // Redirect or show error logic if ID is missing
        console.warn('Subject ID is missing from query params.');
        this.isEditMode = false;
      } else {
        this.subjectId = Number(subjectId_);
        if(this.subjectId > 0) {
          this.getSubjectById(this.subjectId);
        }
      }
    });



    this.getAllSubjects();

    console.log("isEditMode", this.isEditMode);
  }

  getAllSubjects(): void {
    this.http.get(`http://localhost:2000/api/v1/subject/getAllSubjects`).subscribe({
      next: (data:any) => this.subjects = data,
      error: (err) => console.error('Error fetching subject:', err)
    });
  }

  getSubjectById(id: number): void {
    this.http.get(`http://localhost:2000/api/v1/subject/getSubjectById/${id}`).subscribe({
      next: (data:any) => {
        this.isEditMode = true;
        console.log("isEditMode", this.isEditMode);
        this.subject = data;
      },
      error: (err) => console.error('Error fetching subject:', err)
    });
  }

  updateSubject(): void {
    this.http.put(`http://localhost:2000/api/v1/subject/updateSubject/${this.subject.id}`, this.subject).subscribe({
      next: () => {
        alert('Subject updated successfully!');
        this.router.navigate(['/editSubject']).then(()=>{
          window.location.reload();
        }); // Adjust path as needed
      },
      error: (err) => console.error('Error updating subject:', err)
    });
  }
  addSubject(): void {
    console.log(this.subject);
    this.http.post(`http://localhost:2000/api/v1/subject/createSubject`,this.subject).subscribe({
      next: () => {
        alert('Subject added successfully!');
        this.subject = {
          id: 0,
          name: '',
          program: {
            id: 0,
            name: '',
            programCode:''
          }
        };
        this.getAllSubjects();
      },
      error: (err) => {
        console.error('Error adding subject:', err);
        alert('Failed to add subject.');
      }
    });
  }

  // deleteSubject(id: any) {
  //   this.http.delete(`http://localhost:2000/api/v1/subject/deleteSubject/${id}`).subscribe({
  //     next: () => {
  //       alert('Subject deleted successfully!');
  //     }
  //   });
  // }

  deleteSubject(id: number): void {
    const isConfirm=window.alert("are You sure delete this subject?");
    this.http.delete(`http://localhost:2000/api/v1/subject/deleteSubject/${id}`).subscribe({
      next: () => {
        alert('Subject deleted successfully!');
        // Refresh the list without full page reload
        this.getAllSubjects();
      },
      error: (err) => console.error('Error deleting subject:', err)
    });
  }



  editSubject(id: string, updatedData: any) {
    this.http.put('http://localhost:2000/api/v1/subject/' + id, updatedData).subscribe({
      next: () => {
        alert('Subject updated successfully!');
      },
      error: (err) => {
        console.error('Error updating subject:', err);
        alert('Failed to update subject.');
      }
    });
  }


  cancelEdit(): void {
    this.router.navigate(['/editSubject']);
    // Adjust path if needed
  }


}
