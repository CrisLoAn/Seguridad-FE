import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResidences } from 'src/app/classes/student-residence';
import { ResidenceService } from 'src/app/services/data/residence.service';
import { StudentResidenceService } from 'src/app/services/data/studentResidence.service';
import { ResidenteService } from 'src/app/services/update/Residente.service';
import { UpdateServcieService } from 'src/app/services/update/update-servcie.service';

@Component({
  selector: 'app-residence-confirmation-modal',
  templateUrl: './residence-confirmation-modal.component.html',
  styleUrls: ['./residence-confirmation-modal.component.css']
})

export class ResidenceConfirmationModalComponent {

  fecha : number;

  @Input() residenceCode: string;
  showModal: boolean = false;
  userData: any;

  @Output() confirmed: EventEmitter<any> = new EventEmitter<any>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

  constructor( 
    private router: Router, 
    private data: ResidenteService, 
    private studentResidence: StudentResidenceService, 
    private updateService: UpdateServcieService,
    private residenceService: ResidenceService
    ) {}

  ngOnInit(){
  }

  show(residenceCode: string) {
    this.residenceCode = residenceCode;
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  confirm() {
    //En caso de confirmar falta de agregar la parte de envio por correo el correo de confirmación de asignación
    this.router.navigate(['/YTnest']);
    this.close();
  }

  cancel() {
    this.userData = this.data.getData();
    const userId = this.userData.ID_STURES; // Asignamos el ID del usuario a userId
    const userRes = this.userData.ID_CASA;
    // Obtener la información de la residencia del estudiante por el userId
    this.studentResidence.getStudentResidenceById(userId).subscribe(
      (row) => {
        this.residenceService.getResidenceById(userRes).subscribe(
          (resi) => {
            this.updateAndCommit(this.userData.ID_STURES, row, this.userData.ID_CASA,resi); ///se termina el contrato actual con el estudiante y se actualiza la residencia
            // Redireccionar a la página "/YTnest"
            this.router.navigate(['/YTnest']);
            this.close();
          }
        );
        
      },
      (error) => {
        console.error('Error al obtener la residencia del estudiante:', error);
        // Manejar el error según tus necesidades
      }
    );
  }
  

  updateAndCommit(idSR: number, dataToUpdate: any, idRes: number, dataRes: any) {
    const current = new Date();
    const timestamp = current.getTime();
    dataToUpdate.ednDateDeal = timestamp; // Obtener la fecha actual en formato timestamp
    //console.log("Fecha ts: "+ timestamp);
    //console.log("data de la casa traida: ", dataRes);
    // Realizar la petición PUT al backend
    this.updateService.updateResidenceStudent(idSR,dataToUpdate).subscribe(
      (response) => {
        //console.log('Datos SR actualizados en el backend:', response);
        dataRes.residenceAvailability="A";
        this.updateService.updateResidence(idRes,dataRes).subscribe(
          (response) => {
            console.log('Datos de residencia actualizados en el backend:', response);
          },
          (error) => {
            console.error('Error al actualizar res los datos en el backend:', error);
          }
        );
      },
      (error) => {
        console.error('Error al actualizar s-r los datos en el backend:', error);
      }
    );
  }
}
