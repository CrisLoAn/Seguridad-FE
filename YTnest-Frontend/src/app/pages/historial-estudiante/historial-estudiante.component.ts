import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Penalties } from 'src/app/classes/penalties';
import { RECORD } from 'src/app/classes/record';
import { RecordPenalty } from 'src/app/classes/record-penalty';
import { Student } from 'src/app/classes/student';
import { AuthService } from 'src/app/services/auth/AuthService.service';
import { PenaltiesService } from 'src/app/services/data/penalties.service';
import { RecordPenaltyService } from 'src/app/services/data/record-penalty.service';
import { RecordService } from 'src/app/services/data/record.service';
import { StudentService } from 'src/app/services/data/student.service';
import { ToasterService } from 'src/app/toaster.service';

@Component({
  selector: 'app-historial-estudiante',
  templateUrl: './historial-estudiante.component.html',
  styleUrls: ['./historial-estudiante.component.css']
})
export class HistorialEstudianteComponent {
  penalties: Penalties[] = [];
  recordPenaltyData: RecordPenalty[] = [];
  pnties: Penalties;
  record: any[] =[];
  identifier: number = -1;
  recordIdentifier: number = -1;
  student: Student;
  studentId: number;
  puntos: number = 0;
  progressValue: number = 100;

  dataSource = new MatTableDataSource<RecordPenalty>(this.recordPenaltyData);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Fecha penalidad', 'Description', 'Score'];

  constructor(
    private penaltyService: PenaltiesService,
    private recordService: RecordService,
    private authService: AuthService,
    private studentService: StudentService,
    private recordPenaltiesService: RecordPenaltyService,    
    private toasterService: ToasterService,
    private cdr: ChangeDetectorRef,
  ){}


  ngOnInit(): void {
    const data = this.authService.getUserData();
    this.studentId = data.ID;
    this.loadStudent(); 
    this.identifier = this.studentId;
    this.loadRecordByStudentID(this.identifier);
    this.dataSource = new MatTableDataSource<RecordPenalty>(this.recordPenaltyData);
    this.dataSource.paginator = this.paginator;
  }

  loadPenalties(){
    this.penaltyService.findAllPenalties().subscribe(
      (data) => {
            //this.penalties=data;
            if (data) {
              this.penalties = data.filter(penalidad => penalidad.status === 'A');
          }
      },
      (error) => {
        console.log("Error fetching data from penalties")
      }
    );
  }

  loadStudent() {
    this.studentService.getStudentById(this.studentId).subscribe(
      (student) => {
        this.student = student;
        console.log("Estudiante", this.student);
      },
      (error) => {
        console.error("Error fetching student:", error);
      }
    );
  }

  loadRecordByStudentID(studentID: number) {
    this.recordService.findAllRecords().subscribe(
      (records) => {
        this.record = records.filter((data) => data.student_id === studentID);
        if (this.record && this.record.length > 0) {
          // El estudiante tiene un registro, buscamos sus penalidades
          this.recordIdentifier = this.record[0].recordId;
          this.puntos = this.record[0].score;
          this.progressValue = this.puntos * 10;
          this.recordPenaltiesService.findAllRecords().subscribe(
            (recordStudentData) => {
              recordStudentData.forEach(element => {
                // Compara el recordId de cada objeto con el recordIdentifier

                if (element.record.recordId === this.recordIdentifier) {
                  // Realiza las acciones necesarias con el objeto que coincide
                  //console.log("coincide:", element);
                  this.recordPenaltyData.push(element);
                }
              });
              //console.log("record student data by record id, ", recordStudentData);
            }
          );
        } 
        if (this.record && this.record.length > 0) {
          const recordId = this.record[0].recordId;
        
          this.recordPenaltiesService.findAllRecords().subscribe(
            (recordStudentData) => {
              this.recordPenaltyData = recordStudentData.filter(element => 
                element.record && element.record.recordId === recordId
              );
        
              //console.log("RecordPenaltyData:", this.recordPenaltyData);
              //console.log("All record student data:", recordStudentData);
            }
          );
        } else {
          this.createRecord(studentID);
        }
      },
      (error) => {
        console.error("Error fetching students record:", error);
      }
    );
  }

  createRecord(id: number){
    // El estudiante no tiene un registro, creamos uno con 10 puntos iniciales
    this.showToasterInfo("Residente sin historial, se procederá con la creación de un registro!");
  
    const newRecord: RECORD = {
      recordId: 0,
      recordDescription: "Estudiante",
      student: this.student, // Modificado
      score: 10,
      status: 'A',
      recordPenalty: null
    };
    this.recordService.createRecord(newRecord).subscribe(response => {
      this.showToaster("Historial Creado");
      //window.location.reload();
      this.loadRecordByStudentID(id);
      window.location.reload();
    });
  }

  

  studentSection(){
    console.log("Estudiante recuperado", this.student);
  }

  showToaster(msg: string) {
    this.toasterService.success(msg, 'Success');
  }

  showToasterfail(msg:string){
    this.toasterService.error(msg,"Error");
  }

  showToasterInfo(msg:string){
    this.toasterService.info(msg, "Info")
  }
}
