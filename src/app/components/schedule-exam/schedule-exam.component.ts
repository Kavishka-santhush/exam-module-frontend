import { Component, OnInit } from '@angular/core';
import { ScheduleExamService } from '../../services/schedule-exam.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-schedule-exam',
  imports: [
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './schedule-exam.component.html',
  styleUrl: './schedule-exam.component.css'
})
export class ScheduleExamComponent implements OnInit {
  examForm = {
    program: '',
    batch: '',
    subject: '',
    date: '',
    time: '',
    structure: '',
    location: '',
  };

  // Change to arrays of objects
  programs: { id: number; programName: string }[] = [];
  subjects: { id: number; name: string }[] = [];
  examTypes: { id: number; examTypeName: string }[] = [];
  structures: string[] = [];
  locations: string[] = [];

  scheduledExams: any[] = [];

  editing: boolean = false;
  editingId: number | null = null;

  constructor(private scheduleExamService: ScheduleExamService) {}

  async ngOnInit() {
    await this.loadDropdownData();
    await this.loadExams();
  }

  async loadDropdownData() {
    try {
      // Fetch programs as objects
      const programsData = await firstValueFrom(this.scheduleExamService.getPrograms());
      this.programs = programsData.map((p: any) => ({ id: p.id, programName: p.programName }));

      // Fetch all subjects as objects
      const subjectsData = await firstValueFrom(this.scheduleExamService.getSubjects());
      this.subjects = subjectsData.map((s: any) => ({ id: s.id, name: s.name }));

      // Fetch all exam types as objects
      const examTypesData = await firstValueFrom(this.scheduleExamService.getExamTypes());
      this.examTypes = examTypesData.map((e: any) => ({ id: e.id, examTypeName: e.examTypeName }));

      // Fetch exam types (structures)
      const examTypesStructureData = await firstValueFrom(this.scheduleExamService.getExamTypes());
      this.structures = examTypesStructureData.map((e: any) => e.examTypeName);

      // Fetch locations
      const locationsData = await firstValueFrom(this.scheduleExamService.getLocations());
      this.locations = locationsData.map((l: any) => l.name);

      // Initialize subjects and exam types based
      if (this.programs.length > 0) {
        await this.updateSubjects(this.programs[0].id);
        await this.updateExamTypes(this.programs[0].id); // Initialize exam types
      }
    } catch (error) {
      console.error('Error loading dropdown data:', error);
    }
  }

  async updateSubjects(programId: number | null) {
    if (programId === null) {
      this.subjects = [];
      this.examForm.subject = '';
      return;
    }

    try {
      const subjectsData = await firstValueFrom(this.scheduleExamService.getSubjectsByProgram(programId));
      this.subjects = subjectsData.map((s: any) => ({ id: s.id, name: s.name }));
      if (!this.subjects.some(s => s.name === this.examForm.subject)) {
        this.examForm.subject = '';
      }
    } catch (error) {
      console.error('Error updating subjects:', error);
      this.subjects = [];
    }
  }

  async updateExamTypes(programId: number | null) {
    if (programId === null) {
      this.examTypes = [];
      this.examForm.structure = '';
      return;
    }

    try {
      const examTypesData = await firstValueFrom(this.scheduleExamService.getExamTypesByProgram(programId));
      this.examTypes = examTypesData.map((e: any) => ({ id: e.id, examTypeName: e.examTypeName }));
      if (!this.examTypes.some(e => e.examTypeName === this.examForm.structure)) {
        this.examForm.structure = '';
      }
    } catch (error) {
      console.error('Error updating exam types:', error);
      this.examTypes = [];
    }
  }

  async loadExams() {
    try {
      const data = await firstValueFrom(this.scheduleExamService.getAllScheduledExams());
      this.scheduledExams = data;
    } catch (error) {
      console.error('Error loading exams:', error);
    }
  }

  async onSubmit() {
    try {
      if (this.editing) {
        const updatedExam = { ...this.examForm, id: this.editingId };
        await firstValueFrom(this.scheduleExamService.updateExam(updatedExam));
        console.log('Exam updated:', updatedExam);
      } else {
        const response = await firstValueFrom(this.scheduleExamService.scheduleExam(this.examForm));
        console.log('Exam scheduled:', response);
      }

      await this.loadExams();
      this.examForm = {
        program: '',
        batch: '',
        subject: '',
        date: '',
        time: '',
        structure: '',
        location: '',
      };
      this.editing = false;
      this.editingId = null;
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  }

  editExam(exam: any) {
    this.examForm = {
      program: exam.program,
      batch: exam.batch,
      subject: exam.subject,
      date: exam.date,
      time: exam.time,
      structure: exam.structure,
      location: exam.location,
    };
    this.editing = true;
    this.editingId = exam.id;
    const programId = this.getProgramId(exam.program);
    if (programId) {
      this.updateSubjects(programId);
      this.updateExamTypes(programId); // Update exam types on edit
    }
  }

  cancelEdit() {
    this.examForm = {
      program: '',
      batch: '',
      subject: '',
      date: '',
      time: '',
      structure: '',
      location: '',
    };
    this.editing = false;
    this.editingId = null;
    if (this.programs.length > 0) {
      this.updateSubjects(this.programs[0].id);
      this.updateExamTypes(this.programs[0].id); // Reset exam types
    }
  }

  async deleteExam(id: number) {
    if (confirm('Are you sure you want to delete this exam schedule?')) {
      try {
        await firstValueFrom(this.scheduleExamService.deleteExam(id));
        this.loadExams();
      } catch (error) {
        console.error('Error deleting exam:', error);
      }
    }
  }

  getProgramId(programName: string): number | null {
    const program = this.programs.find(p => p.programName === programName);
    return program ? program.id : null;
  }

  onProgramChange() {
    const programId = this.getProgramId(this.examForm.program);
    this.updateSubjects(programId);
    this.updateExamTypes(programId); // Update exam types when program changes
  }
}
