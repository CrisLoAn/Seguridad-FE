import { DialogRef } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResidentService } from 'src/app/services/data/resident.service';
import { Penalties } from 'src/app/classes/penalties';
import { PenaltiesService } from 'src/app/services/data/penalties.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RecordPenalty } from 'src/app/classes/record-penalty';
import { RecordService } from 'src/app/services/data/record.service';
import { AuthService } from 'src/app/services/auth/AuthService.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RECORD, studentRecord } from 'src/app/classes/record';
import { ToasterService } from 'src/app/toaster.service';
import { StudentService } from 'src/app/services/data/student.service';
import { Student } from 'src/app/classes/student';
import { Observable, forkJoin } from 'rxjs';
import { catchError, map, of } from 'rxjs';
import { RecordPenaltys } from 'src/app/classes/record-penaltys';
import { RecordPenaltyService } from 'src/app/services/data/record-penalty.service';
import { error } from 'jquery';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  editForm: FormGroup;
  recordPenaltyData: RecordPenalty[] = [];
  penalties: Penalties[] = [];
  pnties: Penalties;
  record: any[] =[];
  _Record: RECORD[]=[];
  student: Student;
  identifier: number = -1;
  recordIdentifier: number = -1;


  dataSource = new MatTableDataSource<RecordPenalty>(this.recordPenaltyData);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Fecha penalidad', 'Description', 'Score'];

  constructor(
    private fb: FormBuilder,
    private _postForm: ResidentService,
    private _dialogRef: MatDialogRef<EditComponent>, // Agrega el tipo de retorno
    private penaltyService: PenaltiesService,
    private recordService: RecordService,
    private authService: AuthService,
    private toasterService: ToasterService,
    private studentService: StudentService,
    private recordPenaltiesService: RecordPenaltyService,
  ) {
    this.editForm = this.fb.group({
      // Define tus campos y reglas de validación si es necesario
      Penalty: ['', Validators.required],
      Description: ['', Validators.required],
      // Capos del combobox
      PenaltyId: ['', Validators.required],
      costAssociated: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPenalties();
    //console.log("Identificador recuperado", this.authService.getStudentIdentificador())
    this.loadStudent(); 
    this.identifier = this.authService.getStudentIdentificador();
    //console.log("Identi: ", this.identifier);
    this.loadRecordByStudentID(this.identifier);
      // Mover la inicialización aquí después de cargar los datos
    this.dataSource = new MatTableDataSource<RecordPenalty>(this.recordPenaltyData);
    this.dataSource.paginator = this.paginator;
  }

  onFormSubmit() {
    if (this.editForm.valid) {
      this._postForm.addReport(this.editForm.value).subscribe({
        next: (val: any) => {
          alert('Se generó correctamente el llamado de atención');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
  ////Cargamos las tablas de catalogo con las penalidades
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
    this.studentService.getStudentById(this.authService.getStudentIdentificador()).subscribe(
      (student) => {
        this.student = student;
      },
      (error) => {
        console.error("Error fetching student:", error);
      }
    );
  }

  //Cargamos las sanciones de cada estudiante
  loadRecordByStudentID(studentID: number) {
    this.recordService.findAllRecords().subscribe(
      (records) => {
        this.record = records.filter((data) => data.student_id === studentID
        );
        console.log("Record", records);
        if (this.record && this.record.length > 0) {
          // El estudiante tiene un registro, buscamos sus penalidades
          //this.recordPenaltyData = this.record[0].recordPenalty || [];
          this.recordIdentifier = this.record[0].recordId;
          this.recordPenaltiesService.findAllRecords().subscribe(
            (recordStudentData) => {
              recordStudentData.forEach(element => {
                // Compara el recordId de cada objeto con el recordIdentifier
                if (element.record.recordId === this.recordIdentifier) {
                  // Realiza las acciones necesarias con el objeto que coincide
                  console.log("coincide:", element);
                  this.recordPenaltyData.push(element);
                }
              });
              console.log("record student data by record id, ", recordStudentData);
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
        
              console.log("RecordPenaltyData:", this.recordPenaltyData);
              console.log("All record student data:", recordStudentData);
            }
          );
        } else {
          // El estudiante no tiene un registro, creamos uno con 10 puntos iniciales
          // this.showToasterInfo("Residente sin historial, se procederá con la creación de un registro!");
  
          // const newRecord: RECORD = {
          //   recordId: 0,
          //   recordDescription: "Estudiante",
          //   student: this.student, // Modificado
          //   score: 10,
          //   status: 'A',
          //   recordPenalty: null
          // };
  
          // console.log("Historial a ser creado", newRecord);
  
          // this.recordService.createRecord(newRecord).subscribe(response => {
          //   this.showToaster("Historial Creado");
          //   window.location.reload();
          //   this.ngOnInit();
          // });
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

    //console.log("Historial a ser creado", newRecord);

    this.recordService.createRecord(newRecord).subscribe(response => {
      this.showToaster("Historial Creado");
      //window.location.reload();
      this.loadRecordByStudentID(id);
      this.ngOnInit();
    });
  }

  cancelar(): void {
    // Cierra el modal
    this.editForm.reset();
    this._dialogRef.close();
  }

  // 
    generatePenalty() {
    const fechaActual = new Date();
    const newRecordPenalty: RecordPenaltys = {
      recordPenaltyId: 0,
      status: 'A',
      penaltyDate: Number(fechaActual.getTime()),
      description: this.editForm.get('Description').value,
      penalty: {} as Penalties,
      record: {} as RECORD,
    };
    console.log('newRecordPenalty',newRecordPenalty)
    forkJoin([
      this.penaltyService.findPenaltyById(this.editForm.get('PenaltyId').value),
      this.recordService.findRecordById(this.recordIdentifier)
    ]).subscribe(([penaltyData, recordData]) => {
      newRecordPenalty.penalty = penaltyData;
      console.log('recordData',recordData);
      console.log('penaltyData',penaltyData);
      //Creo un objeto record ya que viene modificado desde mi backend
      let _record: RECORD={
        recordId: recordData.recordId,
        recordDescription: recordData.recordDescription,
        status: recordData.status,
        score: recordData.score,
        recordPenalty :recordData.recordPenalty,
        student: recordData.student,
      }

      newRecordPenalty.record = _record;
      console.log("Objeto record: ", _record);
      console.log("Record Penalty a guardar", newRecordPenalty);
      console.log()
      this.recordPenaltiesService.createRecordPenalty(newRecordPenalty).subscribe(
        (response) => {
          this.showToasterInfo("Generando registro en el Historial");
          const newRecordUpdate: RECORD = {
            recordId: newRecordPenalty.record.recordId,
            student: newRecordPenalty.record.student,
            recordDescription: newRecordPenalty.record.recordDescription,
            score: newRecordPenalty.record.score - newRecordPenalty.penalty.penaltyCost,
            status: 'A',
            recordPenalty: null,
          };
  
          this.recordService.updateRecord(this.recordIdentifier, newRecordUpdate).subscribe(
            (response) => {
              this.showToaster("Registro en historial completado con éxito");
              
            },
            (error) => {
              this.showToasterfail("Error al actualizar el puntaje");
            }
          );
        },
        (error) => {
          this.showToasterfail("Error al cargar el registro en el historial");
        }
      );
    });
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
