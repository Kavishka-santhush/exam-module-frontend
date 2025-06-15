import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamCriteriaService } from '../_services/exam-criteria.service';
import { Program } from '../models/program.model';
import { GradeCriteria } from '../models/grade-criteria.model';

@Component({
  selector: 'app-exam-criteria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-criteria.component.html',
  styleUrls: ['./exam-criteria.component.css']
})
export class ExamCriteriaComponent implements OnInit {

  programs: Program[] = [];
  gradesAndCriteria: GradeCriteria[] = [];
  selectedProgramId: number | null = null;
  selectedBindings: { [key: string]: number } = {};

  constructor(private examCriteriaService: ExamCriteriaService) { }

  ngOnInit(): void {
    this.loadPrograms();
    this.loadGradesAndCriteria();
  }

  loadPrograms(): void {
    this.examCriteriaService.getAllPrograms().subscribe(data => {
      this.programs = data;
    });
  }

  loadGradesAndCriteria(): void {
    this.examCriteriaService.getGradesAndCriteria().subscribe(data => {
      this.gradesAndCriteria = data;
    });
  }

  onProgramChange(): void {
    if (this.selectedProgramId) {
      this.examCriteriaService.getSavedCriteria(this.selectedProgramId).subscribe(data => {
        this.selectedBindings = {};
        data.forEach(binding => {
          this.selectedBindings[binding.finalExamCriteria.grade] = binding.finalExamCriteria.id;
        });
      });
    } else {
      this.selectedBindings = {};
    }
  }

  saveBindings(): void {
    if (this.selectedProgramId) {
      const data = {
        programId: this.selectedProgramId,
        bindings: this.selectedBindings
      };
      this.examCriteriaService.saveCriteriaBindings(data).subscribe(() => {
        alert('Bindings saved successfully!');
      });
    }
  }
}
