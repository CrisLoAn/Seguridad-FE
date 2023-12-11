import { Residence } from "./residence";
import { Student } from "./student";

export interface StudentResidence {
    studentResidenceId?: number;
    initDateDeal: number;
    ednDateDeal: number;
    student: Student;
    residence: Residence;
}

export class StudentResidences {
    studentResidenceId?: number;
    student_id: number = 0;
    residenceId: number = 0;
    initDateDeal: number = 0;
    ednDateDeal?: number  | null = 0;
  }
