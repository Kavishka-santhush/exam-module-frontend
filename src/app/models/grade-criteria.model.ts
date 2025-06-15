import { FinalExamCriteria } from "./final-exam-criteria.model";

export interface GradeCriteria {
    grade: string;
    criteriaList: FinalExamCriteria[];
}
