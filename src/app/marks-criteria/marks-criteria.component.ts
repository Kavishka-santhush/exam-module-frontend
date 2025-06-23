import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private marksCriteriaService: MarksCriteriaService, private toastr: ToastrService) { }

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
          // No existing criteria; start with empty list
          this.marksCriteria = [];
        }
      });
    } else {
      this.marksCriteria = [];
    }
  }

  addNewComponentRow() {
    if (!this.selectedProgramId) {
      this.toastr.warning('Please select a course first');
      return;
    }
    this.marksCriteria.push({ id: null, programId: this.selectedProgramId, componentName: '', minMark: 0, percentage: 0 });
  }



  removeComponentRow(index: number): void {
    this.marksCriteria.splice(index, 1);
  }

  saveCriteria(): void {
    if (!this.selectedProgramId) {
        this.toastr.warning('Please select a program before saving');
        return;
    }

    const totalPercentage = this.marksCriteria.reduce((sum, item) => sum + item.percentage, 0);
    if (totalPercentage !== 100) {
      this.toastr.warning('Total weight must be exactly 100%');
      return;
    }

    const validCriteria = this.marksCriteria.filter((c: MarksCriteria) => c.componentName && c.componentName.trim() !== '');

    if (validCriteria.length === 0) {
      this.toastr.warning('Enter at least one component name');
      return;
    }

    this.marksCriteriaService.saveMarksCriteria(validCriteria).subscribe(() => {
      this.toastr.success('Marks criteria saved successfully');
      this.onProgramChange(); // Refresh the data
    }, error => {
      console.error('Error saving marks criteria', error);
      this.toastr.error('Failed to save marks criteria');
    });
  }

  clearForm(): void {
    // this.selectedProgramId = null;
    this.marksCriteria = [];
  }

  downloadFile() {
    if (this.marksCriteria.length === 0) {
      this.toastr.warning('No data to download');
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
