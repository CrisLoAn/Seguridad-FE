export class Repository {
  student_id: number = 0;
  studentCedula: string = '';
  studentFirstName: string = '';
  studentMiddleName: string = '';
  studentLastName: string = '';
  studentSecondSurname: string = '';
  studentGender:string = '';
  studentMail: string = '';
  studentPhone: string = '';
  studentResidences: {
    studentResidenceId: number;
    initDateDeal: Date;
    ednDateDeal: Date;
  }[] = [];
  record: Record[] = []; // Utiliza la clase Record aquí
}

export class Record {
  recordId: number = 0;
  student_id: number = 0;
  score: number = 0;
}
