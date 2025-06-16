import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinalExamCriteriaService } from '../final-exam-criteria.service';
import { FinalExamCriteria } from '../models/final-exam-criteria.model';

@Component({
  selector: 'app-final-exam-criteria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './final-exam-criteria.component.html',
  styleUrls: ['./final-exam-criteria.component.css']
})
export class FinalExamCriteriaComponent implements OnInit {
  criteriaList: FinalExamCriteria[] = [];
  currentCriteria: FinalExamCriteria = { id: 0, minMarks: 0, maxMark: 0, grade: '' };
  isEditing = false;
  grades: string[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E', 'F'];

  constructor(private finalExamCriteriaService: FinalExamCriteriaService) { }

  ngOnInit(): void {
    this.loadCriteria();
  }

  loadCriteria(): void {
    this.finalExamCriteriaService.getAllFinalExamCriteria().subscribe(data => {
      this.criteriaList = data;
    });
  }

  addOrUpdateCriteria(): void {
    if (this.isEditing) {
      this.finalExamCriteriaService.updateFinalExamCriteria(this.currentCriteria.id, this.currentCriteria).subscribe(() => {
        this.loadCriteria();
        this.resetForm();
      });
    } else {
      this.finalExamCriteriaService.createFinalExamCriteria(this.currentCriteria).subscribe(() => {
        this.loadCriteria();
        this.resetForm();
      });
    }
  }

  editCriteria(criteria: FinalExamCriteria): void {
    this.isEditing = true;
    this.currentCriteria = { ...criteria };
  }

  deleteCriteria(id: number): void {
    this.finalExamCriteriaService.deleteFinalExamCriteria(id).subscribe(() => {
      this.loadCriteria();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentCriteria = { id: 0, minMarks: 0, maxMark: 0, grade: '' };
  }
}
