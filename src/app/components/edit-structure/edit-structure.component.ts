import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-structure',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.css']
})
export class EditStructureComponent implements OnInit {
  programs: any[] = [];
  examTypes: any[] = [];

  
  examTypeName: string = '';
  selectedProgramId: number | null = null;

  
  editingExamType: any = null;

  constructor(private programService: ProgramService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadPrograms();
    this.loadExamTypes();
  }

  loadPrograms(): void {
    this.programService.getAllPrograms().subscribe({
      next: (data) => {
        this.programs = data;
      },
      error: (err) => {
        console.error('Error loading programs:', err);
      }
    });
  }

  loadExamTypes(): void {
    this.programService.getAllExamTypes().subscribe({
      next: (data) => {
        this.examTypes = data;
      },
      error: (err) => {
        console.error('Error loading exam types:', err);
      }
    });
  }

  
  addExamType(): void {
    if (!this.examTypeName || !this.selectedProgramId) {
      this.toastr.warning('Please fill in all exam type fields');
      return;
    }

    const examTypeData = {
      examTypeName: this.examTypeName,
      programId: this.selectedProgramId
    };

    this.programService.createExamType(examTypeData).subscribe({
      next: (response) => {
        this.examTypes.push(response);
        this.resetExamTypeForm();
        this.toastr.success('Exam Type added successfully');
      },
      error: (err) => {
        console.error('Error adding exam type:', err);
        this.toastr.error('Failed to add exam type');
      }
    });
  }

  editExamType(examType: any): void {
    this.editingExamType = examType;
    this.examTypeName = examType.examTypeName;
    this.selectedProgramId = examType.programId;
  }

  updateExamType(): void {
    if (!this.editingExamType) return;

    const examTypeData = {
      examTypeName: this.examTypeName,
      programId: this.selectedProgramId
    };

    this.programService.updateExamType(this.editingExamType.id, examTypeData).subscribe({
      next: (response) => {
        const index = this.examTypes.findIndex(e => e.id === this.editingExamType.id);
        if (index !== -1) {
          this.examTypes[index] = response;
        }
        this.resetExamTypeForm();
        this.toastr.success('Exam Type updated successfully');
      },
      error: (err) => {
        console.error('Error updating exam type:', err);
        this.toastr.error('Failed to update exam type');
      }
    });
  }

  deleteExamType(id: number): void {
   
      this.programService.deleteExamType(id).subscribe({
        next: () => {
          this.examTypes = this.examTypes.filter(e => e.id !== id);
          this.toastr.success('Exam Type deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting exam type:', err);
          this.toastr.error('Failed to delete exam type');
        }
      });
    
  }


  resetExamTypeForm(): void {
    this.examTypeName = '';
    this.selectedProgramId = null;
    this.editingExamType = null;
  }

  getProgramName(programId: number): string {
    const program = this.programs.find(p => p.id === programId);
    return program ? program.programName : 'Unknown Program';
  }
}
