import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { EditComponent } from 'src/app/shared/edit/edit.component';
import { Resident } from 'src/app/classes/resident';
import { ResidentService } from 'src/app/services/data/resident.service';
import { StudentResidences } from 'src/app/classes/student-residence';
import { studentRecord } from 'src/app/classes/record';
import { Residence } from 'src/app/classes/residence';
import { Record } from 'src/app/classes/repository';
import { AuthService } from 'src/app/services/auth/AuthService.service';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css'],
})
export class ResidentComponent implements OnInit, AfterViewInit {
  private identificador: number;
  
  resident: Resident[] = [];
  studentResidencesData: StudentResidences[] = [];
  recordsData: studentRecord[] = [];
  residencesData: Residence[] = [];
  
  searchTerm: string = '';
  // filteredStudentsData: Resident[] = [];

  displayedColumns: string[] = [
    'studentCedula',
    'Nombres',
    'studentMail',
    'studentResidences',
    'score',
    'Actions',
  ];

  dataSource: MatTableDataSource<Resident>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private residentService: ResidentService,
    private _dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.dataSource = new MatTableDataSource<Resident>();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.residentService.findAllResident().subscribe(
      (residentData) => {
        this.dataSource.data = residentData;
        this.loadStudentResidences();
      },
      (error) => {
        console.log('error occurred!!', error);
      }
    );
  }


  private loadStudentResidences() {
    this.residentService.findAllStudentResidences().subscribe(
      (studentResidencesData) => {
        this.studentResidencesData = studentResidencesData;
        this.loadResidences();
      },
      (error) => {
        console.error('Error fetching student residences data:', error);
      }
    );
  }

  private loadResidences() {
    this.residentService.findAllResidences().subscribe(
      (residencesData) => {
        this.residencesData = residencesData;
        this.loadRecords();
      },
      (error) => {
        console.error('Error fetching residences data:', error);
      }
    );
  }

  private loadRecords() {
    this.residentService.findAllRecords().subscribe(
      (records) => {
        this.recordsData = records;
        console.log('Records Data:', this.recordsData);
      },
      (error) => {
        console.error('Error fetching records data:', error);
      }
    );
  }
  // para el score
  hasRecord(student_id: number): boolean {
    return this.recordsData.some((record) => record.student_id === student_id);
  }

  getScore(student_id: number): number {
    const record = this.recordsData.find(
      (record) => record.student_id === student_id
    );
    return record ? record.score : 0; // Puedes cambiar 0 por un valor predeterminado si no se encuentra el registro.
  }

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

  openEditForm(studentId: number) {
    this.authService.setStudentIdentificador(studentId);
    //console.log("Id recuperado, ", studentId);
    this._dialog.open(EditComponent);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isDateValid(timestamp: number | null): boolean {
    return timestamp === null;
  }

  getResidenceCode(student_id: number): string | null {
    const filteredStudentResidencesData = this.studentResidencesData.filter(
      (residence) => residence.student_id === student_id && residence.residenceId !== null
    );
  
    const validResidencesData = filteredStudentResidencesData.filter(
      (residence) => this.isDateValid(residence.ednDateDeal)
    );
  
    if (validResidencesData.length === 0) {
      return null;
    }
  
    const validResidence = this.residencesData.find(
      (res) => res.residenceId === validResidencesData[0].residenceId
    );
  
    return validResidence ? validResidence.residenceCode : null;
  }
  
  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }


}











 








