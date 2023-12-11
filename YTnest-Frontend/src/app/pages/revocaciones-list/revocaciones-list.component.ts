import { Component, OnInit, ViewChild } from '@angular/core';
import { RevocacionesService } from 'src/app/services/data/revocaciones.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import {Repository} from 'src/app/classes/repository';
import { studentRecord } from 'src/app/classes/record';
import { StudentResidences } from 'src/app/classes/student-residence';
import { Residence } from 'src/app/classes/residence';
import { StudentService } from 'src/app/services/data/student.service';
import { ToasterService } from 'src/app/toaster.service';


@Component({
  selector: 'app-revocaciones-list',
  templateUrl: './revocaciones-list.component.html',
  styleUrls: ['./revocaciones-list.component.css']
})
export class RevocacionesListComponent implements OnInit {
  studentsData: Repository[] = [];
  recordsData: studentRecord[] = [];
  studentResidencesData: StudentResidences[] = [];
  residencesData: Residence[] = [];
  deletedStudentsData: Repository[] = [];
  deletedStudentResidencesData: StudentResidences[] = [];

  elementsPerPage = 10;
  currentPage = 1;

  searchTerm: string = '';
  filteredStudentsData: Repository[] = [];
 
  
  constructor(
    private revocacionesService: RevocacionesService,
    private http: HttpClient,
    public service: RevocacionesService,
    private toasterService: ToasterService
    ) {}

  ngOnInit(): void {
    this.getStudents();
    this.filterStudents();
  }

  private getStudents() {
    this.revocacionesService.findAllStudents().subscribe(
      studentData => {
        this.studentsData = studentData;
        this.loadRecords();
        this.loadStudentResidences();
        this.loadResidences();
        this.filteredStudentsData = [...this.studentsData];
      },
      error => {
        console.error('Error fetching students data:', error);
      }
    );
  }
  // cargar los registros
  private loadRecords() {
    this.revocacionesService.findAllRecords().subscribe(
      records => {
        this.recordsData = records;
        console.log('Records Data:', this.recordsData);
      },
      error => {
        console.error('Error fetching records data:', error);
      }
    );
  }

  private loadStudentResidences() {
    this.revocacionesService.findAllStudentResidences().subscribe(
      studentResidences => {
        this.studentResidencesData = studentResidences;
        console.log('Student Residences Data:', this.studentResidencesData);
      },
      error => {
        console.error('Error fetching student residences data:', error);
      }
    );
  }

  private loadResidences() {
    this.revocacionesService.findAllResidences().subscribe(
      residences => {
        this.residencesData = residences;
        console.log('Residences Data:', this.residencesData);
      },
      error => {
        console.error('Error fetching residences data:', error);
      }
    );
  }
  // funciones combinatorias para score

  hasRecord(student_id: number): boolean {
    return this.recordsData.some((record) => record.student_id === student_id);
  }

  getScore(student_id: number): number {
    const record = this.recordsData.find((record) => record.student_id === student_id);
    return record ? record.score : 0; // Puedes cambiar 0 por un valor predeterminado si no se encuentra el registro.
  }

  // para residenceCode
  isDateValid(timestamp: number | null): boolean {
  
    return timestamp === null;
  }


  getResidenceCode(student_id: number): string | null {

    const filteredStudentResidencesData = this.studentResidencesData.filter(
      (residence) => residence.student_id === student_id
    );


    const validResidencesData = filteredStudentResidencesData.filter(
      (residence) => this.isDateValid(residence.ednDateDeal)
    );

    if (validResidencesData.length === 0) {
      return null;
    }

    const validResidence = validResidencesData.find(
      (residence) => residence.residenceId === validResidencesData[0].residenceId
    );

    if (!validResidence) {
      return null;
    }

    const residence = this.residencesData.find((res) => res.residenceId === validResidence.residenceId);

    return residence ? residence.residenceCode : null;
  }

  // Función para revocar estudiante
  revocar(studentResidence: StudentResidences) {
    const currentDate = new Date().getTime();
    const updatedStudentResidence: StudentResidences = {
      ...studentResidence,
      ednDateDeal: currentDate
    };
    console.log("Datos", updatedStudentResidence)
    console.log("Residencia a revoocar", studentResidence.residenceId)
    this.http
      .put(`${this.revocacionesService.backendURL}/studentsResidences/${updatedStudentResidence.studentResidenceId}`, updatedStudentResidence)
      .subscribe(
        (response) => {
          console.log('Contrato termminado, procediendo con la habilitación de la residencia');
          this.showToasterInfo("Contrato termminado, procediendo con la habilitación de la residencia");
          this.actualizarResidenceAvailability(updatedStudentResidence.residenceId);
        },
        error => {
          console.error('Algo salió mal al terminal el contrato:', error);
          this.showToasterfail("Algo salió mal al terminal el contrato!")
        }
      );
    }    
    
    actualizarResidenceAvailability(residenceId: number) {
      const updatedResidence: Residence | undefined = this.residencesData.find(residence => residence.residenceId === residenceId);
    
      if (updatedResidence) {
        updatedResidence.residenceId = updatedResidence.residenceId || residenceId;
        updatedResidence.residenceAvailability = 'A';
        
        this.http
          .put(`${this.revocacionesService.backendURL}/residences/${residenceId}`, updatedResidence)
          .subscribe(
            (response) => {
              console.log('... se procedió con la habilitación de la residencia');
              this.showToasterInfo("... se procedió con la habilitación de la residencia");
              this.showToaster("¡Proceso exitoso!")
            },
            error => {
              console.error('Error actualizando residenceAvailability:', error);
              this.showToasterfail("¡Algo salió mal al habilitar la residencia!")
            }
          );
      }
      setTimeout(function() {
        window.location.reload();
    }, 5000);
    }
    
    getStudentResidence(student_id: number): StudentResidences {
      const studentResidence = this.studentResidencesData.find(residence => residence.student_id === student_id);
      return studentResidence || { studentResidenceId: 0, student_id: student_id, residenceId: 0, initDateDeal:0, ednDateDeal: 0 };
    }
    //Score color
    getScoreStyle(score: number): string {
      if (score >= 9 && score <= 10) {
        return 'score-green';
      } else if (score >= 7 && score <= 8) {
        return 'score-blue';
      } else if (score >= 5 && score <= 6) {
        return 'score-yellow';
      } else if (score >= 3 && score <= 4) {
        return 'score-orange';
      } else {
        return 'score-red';
      }
    }
    // filtro de busqueda
  // Función para filtrar estudiantes según el término de búsqueda
  filterStudents() {
    if (!this.searchTerm) {
      this.filteredStudentsData = this.studentsData;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredStudentsData = this.studentsData.filter(student =>
        this.containsSearchTerm(student, searchTermLower)
      );
    }
  }
  // Función para verificar si el término de búsqueda está presente en algún campo del estudiante.
  private containsSearchTerm(student: Repository, searchTermLower: string): boolean {
    return (
      student.studentCedula.toLowerCase().includes(searchTermLower) ||
      (student.studentLastName.toLowerCase() +" "+student.studentSecondSurname.toLowerCase()).includes(searchTermLower) ||
      (student.studentFirstName.toLowerCase() +" "+
      student.studentMiddleName.toLowerCase()).includes(searchTermLower) ||
      student.studentMail.toLowerCase().includes(searchTermLower) ||
      student.studentPhone.toLowerCase().includes(searchTermLower) ||
      this.containsResidenceCode(student, searchTermLower)||
      student.studentLastName.toLowerCase().includes(searchTermLower) ||
      student.studentSecondSurname.toLowerCase().includes(searchTermLower)||
      student.studentLastName.toLowerCase().includes(searchTermLower)||
      student.studentMiddleName.toLowerCase().includes(searchTermLower)


    );
  }

 // Función para verificar si el término de búsqueda está presente en el residence code del estudiante.
private containsResidenceCode(student: Repository, searchTermLower: string): boolean {
  const residenceCode = this.getResidenceCode(student.student_id);
  return !!residenceCode && residenceCode.toLowerCase().includes(searchTermLower);
}
   

// PAGINADOR
onPageChange(page: number) {
  this.currentPage = page;
  this.updateFilteredStudentsData();
}

updateFilteredStudentsData() {
  const startIndex = (this.currentPage - 1) * this.elementsPerPage;
  const endIndex = startIndex + this.elementsPerPage;
  this.filteredStudentsData = this.studentsData.slice(startIndex, endIndex).filter(student =>
    this.containsSearchTerm(student, this.searchTerm.toLowerCase())
  );
}

showToaster(msg: string) {
  this.toasterService.success(msg, 'Success');
}

showToasterfail(msg: string){
  this.toasterService.error(msg,"error");
}

showToasterInfo(msg:string){
  this.toasterService.info(msg,"Info");
}

}