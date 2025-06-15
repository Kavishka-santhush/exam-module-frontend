import { FinalExamCriteria } from "./final-exam-criteria.model";

export interface ScExamProgMarksCriteria {
    id: number;
    programId: number;
    marks: number;
    finalExamCriteria: FinalExamCriteria;
}
