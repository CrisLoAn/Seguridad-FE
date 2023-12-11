export class Resident {
  student_id: number;
  studentCedula: string = '';
  studentFirstName: string = '';
  studentMiddleName: string = '';
  studentLastName: string = '';
  studentSecondSurname: string = '';
  studentGender: string = '';
  studentProvince: string = '';
  studentSemester: number = 0;
  studentMail: string = '';
  studentPhone: string = '';
  studentResidences: {
    studentResidenceId: number;
    initDateDeal: Date;
    ednDateDeal: Date;
  }[] = [];
  record: Record[] = [];
}
export class Record {
  recordId: number = 0;
  student_id: number = 0;
  score: number = 0;
}
