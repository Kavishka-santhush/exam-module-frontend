import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarksCriteriaService } from '../marks-criteria.service';
import { Program } from '../models/program.model';
import { MarksCriteria } from '../models/marks-criteria.model';

@Component({
  selector: 'app-marks-criteria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marks-criteria.component.html',
  styleUrls: ['./marks-criteria.component.css']
})
export class MarksCriteriaComponent implements OnInit {

  programs: Program[] = [];
  marksCriteria: MarksCriteria[] = [];
  selectedProgramId: number | null = null;

  constructor(private marksCriteriaService: MarksCriteriaService) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.marksCriteriaService.getAllPrograms().subscribe(data => {
      this.programs = data;
    });
  }

  onProgramChange(): void {
    if (this.selectedProgramId) {
      this.marksCriteriaService.getMarksCriteriaByProgram(this.selectedProgramId).subscribe(data => {
        if (data && data.length > 0) {
          this.marksCriteria = data;
        } else {
          this.setDefaultCriteria();
        }
      });
    } else {
      this.marksCriteria = [];
    }
  }

  addNewComponentRow() {
    if (!this.selectedProgramId) {
      alert('Please select a course first.');
      return;
    }
    this.marksCriteria.push({ id: null, programId: this.selectedProgramId, componentName: '', minMark: 0, percentage: 0 });
  }

  setDefaultCriteria() {
    if (!this.selectedProgramId) return;
    this.marksCriteria = [
      { id: null, programId: this.selectedProgramId, componentName: 'Assignment 01', minMark: 0, percentage: 0 },
      { id: null, programId: this.selectedProgramId, componentName: 'Assignment 02', minMark: 0, percentage: 0 },
      { id: null, programId: this.selectedProgramId, componentName: 'Mid exam', minMark: 0, percentage: 0 }
    ];
  }

  saveCriteria(): void {
    if (!this.selectedProgramId) {
        alert('Please select a program before saving.');
        return;
    }

    const totalPercentage = this.marksCriteria.reduce((sum, item) => sum + item.percentage, 0);
    if (totalPercentage !== 100) {
      alert('The total weight percentage must be exactly 100.');
      return;
    }

    const validCriteria = this.marksCriteria.filter((c: MarksCriteria) => c.componentName && c.componentName.trim() !== '');

    if (validCriteria.length === 0) {
      alert('Please enter at least one component with a name.');
      return;
    }

    this.marksCriteriaService.saveMarksCriteria(validCriteria).subscribe(() => {
      alert('Marks criteria saved successfully!');
      this.onProgramChange(); // Refresh the data
    }, error => {
      console.error('Error saving marks criteria', error);
      alert('Failed to save marks criteria.');
    });
  }

  clearForm(): void {
    this.selectedProgramId = null;
    this.marksCriteria = [];
  }

  downloadFile() {
    if (this.marksCriteria.length === 0) {
      alert('No data to download.');
      return;
    }
    const header = ['Component', 'Minimum Marks', 'Weight %'];
    const rows = this.marksCriteria.map(row => [
      row.componentName || 'N/A',
      row.minMark,
      row.percentage
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += header.join(',') + '\r\n';
    rows.forEach(rowArray => {
      const row = rowArray.join(',');
      csvContent += row + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'marks-criteria.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
