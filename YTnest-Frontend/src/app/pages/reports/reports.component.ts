import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from 'src/app/services/data/reports.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { SolicitudesService } from 'src/app/services/data/solicitudes.service';

import { Repository } from 'src/app/classes/repository';
import { studentRecord } from 'src/app/classes/record';
import { Residence } from 'src/app/classes/residence';
import { StudentResidences } from 'src/app/classes/student-residence';
import { Cost } from 'src/app/classes/cost';
import { ToasterService } from 'src/app/toaster.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  studentsData: Repository[] = [];
  recordsData: studentRecord[] = [];
  residenceData: Residence[] = [];
  studentResidencesData: StudentResidences[] = [];
  costsData: Cost[] = [];
  
  elementsPerPage = 10;
  currentPage = 1;

  searchTerm: string = '';
  filteredStudentsData: Repository[] = [];

  constructor(
    private reportService: ReportsService,
    private http: HttpClient, 
    private service: ReportsService,
    private solicitudesService: SolicitudesService,
    private toasterService: ToasterService
  ){}

  ngOnInit(): void {
    this.getStudents();
    this.filterStudents();
  }

  private getStudents(){
    this.reportService.findAllStudents().subscribe(
      studentsData => {
        this.studentsData = studentsData;
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
    this.reportService.findAllRecords().subscribe(
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
    this.reportService.findAllStudentResidences().subscribe(
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
    this.reportService.findAllResidences().subscribe(
      residences => {
        this.residenceData = residences;
        console.log('Residences Data:', this.residenceData);
      },
      error => {
        console.error('Error fetching residences data:', error);
      }
    );
  }
  
  hasRecord(student_id: number): boolean {
    return this.recordsData.some((record) => record.student_id === student_id);
  }

  getScore(student_id: number): number {
    const record = this.recordsData.find((record) => record.student_id === student_id);
    return record ? record.score : null; 
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

    const residence = this.residenceData.find((res) => res.residenceId === validResidence.residenceId);

    return residence ? residence.residenceCode : null;
  }

  // Aqui va una funcion bien perrona que solo me de los resultados de los estuiantes que si tienen casa

  getStudentsWithResidence(): Repository[] {
    return this.filteredStudentsData.filter(student => {
      const residenceCode = this.getResidenceCode(student.student_id);
      return residenceCode !== null;
    });
  }  

  getResidenceDate(student_id: number): Date | null {
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
  
    const residence = this.studentResidencesData.find((res) => res.residenceId === validResidence.residenceId);
  
    if (residence && residence.initDateDeal) {
      return new Date(residence.initDateDeal);
    }
  
    return null;
  }
  
  private loadCosts() {
    this.solicitudesService.findAllCosts().subscribe(
      (costs) => {
        this.costsData = costs;
        console.log('Costs Data:', this.costsData);
      },
      (error) => {
        console.error('Error fetching costs data:', error);
      }
    );
  }

  getResidenceCost(student_id: number): number | null {
    const residenceCode = this.getResidenceCode(student_id);
    if (!residenceCode) {
      return null;
    }

    const residence = this.residenceData.find(
      (res) => res.residenceCode === residenceCode
    );
    if (!residence) {
      return null;
    }

    const cost_id = residence.cost_id;
    const cost = this.costsData.find((cost) => cost.cost_id === cost_id);
    return cost ? cost.costPrice : null;
  
  }

  //Funcion para generar los reportes

  
  exportExcel(student_id: number) {
    const student = this.filteredStudentsData.find((student) => student.student_id === student_id);
  
    if (student) {
      const residenceCode = this.getResidenceCode(student.student_id);
      const residenceCost = this.getResidenceCost(student.student_id);
  
      const dataExcel: any[] = [
        {
          No: student.student_id,
          Valor: residenceCost,
          IDServicio: student.studentCedula + "M222",
          NombreDelTercer: student.studentLastName + " " + student.studentSecondSurname + " " + student.studentFirstName + " " + student.studentMiddleName,
          TipodeID: 'C',
          Identificacion: student.studentCedula,
          Tramadebanco: student.studentCedula + " RESUITEYREUSDABDEL " +  " " + student.studentLastName + " " + student.studentSecondSurname + " " + student.studentFirstName + " " + student.studentMiddleName + student.studentCedula
                        + "000000000A000000000",
          Status: "Estudiante en la matriz #",
          Residencia: residenceCode,
          PagoRealizado: "Aceptado",
        }
      ];
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExcel);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const fileName = 'tabla_reporte.xlsx';
      XLSX.writeFile(wb, fileName);
    }
  }

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
  // Busqueda
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
