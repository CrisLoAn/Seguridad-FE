import { Cost } from "./cost";
import { StudentResidences } from "./student-residence";

export interface Student {
    student_id: number ;
    studentCedula: string;
    studentFirstName: string;
    studentMiddleName: string ;
    studentLastName: string ;
    studentSecondSurname: string;
    studentGender: string;
    studentProvince: string;
    studentSemester: number ;
    studentMail: string ;
    studentPhone: string ;
    status: string ;
    studentGSEC: number;
    studentRepresentative: boolean;
    cost: Cost | null;
    studentResidences: StudentResidences | null;
}
