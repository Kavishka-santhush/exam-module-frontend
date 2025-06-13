import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-structure',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, HttpClientModule],
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.css']
})
export class EditStructureComponent implements OnInit {
  programs: any[] = [];
  examTypes: any[] = [];

  
  examTypeName: string = '';
  selectedProgramId: number | null = null;

  
  editingExamType: any = null;

  constructor(private programService: ProgramService) {}

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
      alert('Please fill in all exam type fields');
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
        alert('Exam Type added successfully');
      },
      error: (err) => {
        console.error('Error adding exam type:', err);
        alert('Failed to add exam type: ' + (err.error?.message || 'Unknown error'));
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
        alert('Exam Type updated successfully');
      },
      error: (err) => {
        console.error('Error updating exam type:', err);
        alert('Failed to update exam type: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  deleteExamType(id: number): void {
    if (confirm('Are you sure you want to delete this exam type?')) {
      this.programService.deleteExamType(id).subscribe({
        next: () => {
          this.examTypes = this.examTypes.filter(e => e.id !== id);
          alert('Exam Type deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting exam type:', err);
          alert('Failed to delete exam type: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
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
