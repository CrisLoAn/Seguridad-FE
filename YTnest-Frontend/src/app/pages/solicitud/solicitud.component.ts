import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, forkJoin } from 'rxjs';
import { Cost } from 'src/app/classes/cost';
import { Residence } from 'src/app/classes/residence';
import { CostService } from 'src/app/services/data/cost.service';
import { ResidenceService } from 'src/app/services/data/residence.service';

import { default as _ } from 'lodash';
import { AuthService } from 'src/app/services/auth/AuthService.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/services/data/student.service';
import { ResidenceConfirmationModalComponent } from '../modales/residence-confirmation-modal/residence-confirmation-modal.component';
import { ResidenteService } from 'src/app/services/update/Residente.service';
import { StudentResidenceService } from 'src/app/services/data/studentResidence.service';
import { StudentResidences } from 'src/app/classes/student-residence';
import { ToasterService } from 'src/app/toaster.service';
import { StudentResidence } from 'src/app/classes/student-residence';
import { Student } from 'src/app/classes/student';
import { Router } from '@angular/router';

import { Settings } from 'src/app/classes/settings';
import { SettingsService } from 'src/app/services/data/settings.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit, AfterViewInit {
  residence?: any[];
  settingsData: Settings[] = [];
  costos: any[];
  userData: any;
  studentResidence: StudentResidences;
  
  displayedColumns: string[] = [
    'residence_id',
    'residence_code',
    'residence_capacity',
    'residence_gender',
    'residence_location',
    'residence_area',
    'residence_type_id',
    'cost_id',
    'cost_price',
  ];

  minPrecioFilter: number | undefined;
  maxPrecioFilter: number | undefined;
  lugarFilter: string | undefined;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('confirmationModal') confirmationModal: ResidenceConfirmationModalComponent;

  constructor(private http: HttpClient,
     private router: Router,
     private settingsService: SettingsService,
     private residenceService: ResidenceService, 
     private costService: CostService,
     private authService: AuthService, 
     private studentService: StudentService, 
     private sr: ResidenteService,
     private studentResidenceSRVC: StudentResidenceService,
     private cs: CostService,
     private toasterService: ToasterService){
    this.dataSource = new MatTableDataSource<Residence>();
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.getCostos();
    this.getSettings();
 }

 private getSettings() {
  this.settingsService.getAllSettings().subscribe(
    
    (settingsData: Settings[]) => {
      this.settingsData = settingsData;
      console.log("Configuraciones: ",this.settingsData);
      const configuracionesActivas = settingsData.filter(configuracion => configuracion.status === 'A');
      // Verificar si hay configuraciones activas
      const fechaActual: Date = new Date();
      console.log("Fecha actual:", fechaActual);
      if (configuracionesActivas.length > 0) {
        if (this.isDateBetween(new Date(configuracionesActivas[0].settingInitDate), new Date(configuracionesActivas[0].settingEndDate), fechaActual)) {
          console.log('La fecha está entre las fechas especificadas.');
          this.getResidences(this.userData.GSEC);
          this.comprobarResidencia(this.userData.ID);
        } else {
          this.showToasterinfo("No existen periodos activos de postulación!")
        }
      } else {
        this.showToasterinfo("No existen periodos activos de postulación!")
      }
    },
    error => {
      console.error('Error fetching settings data:', error);
    }
  );
}

public getStatus(): string | null{
  if (this.settingsData.length === 0) {
    return null; 
  }
  const n = this.settingsData[this.settingsData.length - 1].setting_id
  const filteredSettingsData = this.settingsData.find(
    (setting) => setting.setting_id === n
  );
  return filteredSettingsData.status
}
 
 private getResidences(n: number) {
  this.residenceService.getResidencesByGender(this.userData.Gender).subscribe(
    residenceData => {
      // Asignamos la lista de residencias a una variable local para facilitar el acceso.
      const residencesList = residenceData;
      //console.log("casas", residenceData);
      // Verificamos que residencesList no sea nulo o indefinido antes de filtrar.
      if (residencesList) {
        let filteredResidences;

        // Si n es igual a 5 o 4, filtramos las residencias según las condiciones.
        if (n === 5 || n === 4) {
          filteredResidences = residencesList.filter(residence => {
            return residence.status === "A" && residence.residenceAvailability === "A";
          });
        } else {
          // Si n no es igual a 5 o 4, mostramos todas las residencias activas donde "residenceAvailability" es igual a "A".
          filteredResidences = residencesList.filter(residence => {
            //console.log("This side");
            return residence.status === "A" && residence.residenceAvailability === "A" && residence.socioeconomicGroupResidences.length <= n;
          });
        }

        // Recorremos la lista de residencias filtradas y mostramos sus tamaños socioeconomicGroupResidencesLength.
        for (const residence of filteredResidences) {
          const socioeconomicGroupResidencesLength = residence.socioeconomicGroupResidences.length;
          //console.log('Tamaño de socioeconomicGroupResidences para la residencia', residence.residenceId, ':', socioeconomicGroupResidencesLength);
        }

        // Ahora, puedes seguir trabajando con la lista de residencias filtradas u otros datos, si es necesario.
        this.dataSource.data = filteredResidences;
      }
    },
    error => {
      //console.log("Error fetching residences:", error);
    }
  );
}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  //Obtenemos el genero de un campo pasado desde el backend
  getGender(gender: string): string {
    if (gender === 'M') {
      return 'Másculino';
    } else if (gender === 'F') {
      return 'Femenino';
    } else {
      return 'Desconocido'; // O cualquier otro valor predeterminado
    }
  }

  getCostos()
  {
    this.cs.findAllCosts().subscribe(values =>{
    //console.log("Valores encontrados ", values);
    this.costos = values;
    });
  }

  getCosto(id: number) {
    //console.log(this.costos.length);
    if (this.costos.length > 0) {
      for (let i = 0; i < this.costos.length; i++) {
        if (this.costos[i].cost_id === id) {
          return this.costos[i].costPrice;
        }
      }
    }
    return 0;
  }

  //Obtenemos la plaza disponible de la ultima posicion del string entrante 
  getLastCharacter(inputString: string): string {
    if (inputString && inputString.length > 0) {
      return inputString.charAt(inputString.length - 1);
    } else {
      return ''; // Devuelve una cadena vacía si la entrada es nula o vacía
    }
  }

  //Quitamos los dos ultimos caracteres con el objetivo de obtener el departamento
  removeLastTwoCharacters(inputString: string): string {
    if (inputString && inputString.length >= 2) {
      return inputString.slice(0, -2);
    } else {
      return ''; 
    }
  }

  applyFilter() {
    // Filtrar por lugar
    const lugarFilterValue = this.lugarFilter ? this.lugarFilter.trim().toLowerCase() : '';
  
    // Filtrar por precio
    const minPrecio = this.minPrecioFilter ? this.minPrecioFilter : 0;
    const maxPrecio = this.maxPrecioFilter ? this.maxPrecioFilter : Number.MAX_VALUE;
  
    // Aplicar el filtro personalizado
    this.dataSource.filterPredicate = (data: Residence, filter: string) => {
      const lugarMatch = data.residenceLocation.toLowerCase().includes(lugarFilterValue);
      const precio = data.cost_id ? data.cost_id.costPrice : 0;
      const precioInRange = precio >= minPrecio && precio <= maxPrecio;
      return lugarMatch && precioInRange;
    };
  
    // Aplicar el filtro
    this.dataSource.filter = 'trigger';
  }
 
  public comprobarResidencia(studentID: number) {
    this.studentService.getStudentById(studentID).subscribe(
      studentData => 
      {
        let casas  = this.studentService.getResidence(studentData);
        //Basicamente comprobamos si hay casas con endDealdate==null entonces hay una casa suscrita
        if(casas.length>0)
        {
          let codigoCasa = casas[0].residenceId;
          let codigoContrato = casas[0].studentResidenceId;
          
          this.residenceService.getResidenceById(codigoCasa).subscribe(residencias => {
          console.log("Residencias", residencias);
          let codigoResidencia = residencias.residenceCode;
          this.sr.setData({ID_CASA: codigoCasa , ID_STURES:codigoContrato});
          this.confirmationModal.show(codigoResidencia);
          });
        }
        else
        {
          this.getResidences(this.userData.GSEC);
        }
      },
      error => {
        console.log('Error al buscar el estudiante:', error);
      }
    );
  }
  


  reservarResidencia(idResi: number, costo: number) {
    // Recupero los datos student_id, residence_id
    this.studentService.getStudentById(this.userData.ID).subscribe(
      (estudiante) => {
        let names = estudiante.studentFirstName+" "+estudiante.studentMiddleName+" "+ estudiante.studentLastName+" "+estudiante.studentSecondSurname
        // Recupero la residencia después de obtener el estudiante
        this.residenceService.getResidenceById(idResi).subscribe(
          (residencia) => {
            // Recupero la fecha actual en timestamp
            const current = new Date();
            const timestamp = current.getTime();
            console.log("user data", this.userData)
            //Creo el objeto StudentResidence con la información obtenida
            let objSTURES: StudentResidences = {
              initDateDeal: timestamp,
              ednDateDeal: null, // Debes asignar el valor adecuado si es necesario
              student_id: this.userData.ID ,
              residenceId: idResi,
            };
            this.studentResidenceSRVC.addStudentResidence(objSTURES).subscribe(
              (response) => {
                this.showToaster(); // Mostrar notificación de éxito
                this.residenceService.actualizarResidenceAvailability(idResi,residencia);
                //Procedemos con el envio del correo
                this.mailerMaker(estudiante.studentMail,names, residencia.residenceCode, costo);
                this.router.navigate(['/YTnest']);
              },
              (error) => {
                this.showToasterfail(); // Mostrar notificación de error
              }
            );
           
          },
          (error) => {
            console.error('Error al recuperar la residencia', error);
            this.showToasterfail(); // Mostrar notificación de error
          }
        );
      },
      (error) => {
        console.error('Error al recuperar el estudiante', error);
        this.showToasterfail(); // Mostrar notificación de error
      }
    );
  }

  showToaster() {
    this.toasterService.success('Residencia reservada con éxito!', 'Success');
  }

  showToasterfail(){
    this.toasterService.error("Algo salió mal al reservar su residencia","error");
  }

  showToasterinfo(msg: string){
    this.toasterService.warning(msg,"Aviso");
  }


  mailerMaker(studentMail:string, studentNames: string, residenceCode: string, cost: number):void{
    var htm = '<html> <body>' +
    '<div style="background-color: rgba(119,136,153, 0.1); float: left; border-radius: 8px; padding:10px">' +
    '<p>Estimado/a ' + studentNames + '</p>' +
    '<p>El presente tiene como finalidad informarle que su solicitud a una residencia en el Campus Universitario ha sido <strong>Aprobada, &nbsp;</strong>la residencia asignada es <strong>' + residenceCode + '</strong>, con un pago mensual de <strong>$' + cost.toFixed(2) + '</strong> y se entregará acorde al cronograma y horario establecido.' +
    '<p>Solicitamos de la manera más comedida que cumpla con el cronograma establecido.</p>' +
    '<div style="display: flex; align-items: center;">' +
    '<div style="width: 15%;">' +
    '<img src="https://drive.google.com/uc?export=download&id=1-rx1rk8lSHCKOCE5a8WZIMh8y_1UemKK" height="100">' +
    '</div>' +
    '<div style="width: 90%;">| Sistema de residencias</div>' +
    '</div>' +
    '<strong>Nota: Este correo es un servicio de reporte automatizado. Le recomendamos escribir ante cualquier inquietud a <a href="mailto:vidacomunitaria@yachaytech.edu.ec">vidacomunitaria@yachaytech.edu.ec</a>.</strong>' +
    '<br>' +
    '<br>Encuentre adjunto el reglamento de uso de residencias para estudiantes de la UITEY en <a href="https://www.yachaytech.edu.ec//wp-content/uploads/2022/06/RCIFI-SE-014-No.078-2022-Reglamento-de-residencias.pdf">https://www.yachaytech.edu.ec//wp-content/uploads/2022/06/RCIFI-SE-014-No.078-2022-Reglamento-de-residencias.pdf</a>&nbsp;</strong></p>' +
    '<p>--</p>' +
    '</div>' +
    '<img src="https://ci3.googleusercontent.com/mail-sig/AIorK4y-Iu_o0kXJK5ezZaDUKCcGWoohjmS5vLzfR1RoTPpHdQUtE3S7XmdcdsK2jYYgMhqbWUYuwq8">' +
    '</body> </html>';


        //Creo el objeto Mail con la información obtenida
        let objMail: any = {
          to: studentMail,
          subject: "Preasignación residencia - YTnest service", // Debes asignar el valor adecuado si es necesario
          htmlContent:htm
        };

        console.log("Mail", objMail);

        //envio de correo
        this.studentResidenceSRVC.sendEmail(objMail).subscribe(
          (response) => {
            console.log("Respuesta del mailer", response);
          }
        );

}

  isDateBetween(startDate: Date, endDate: Date, checkDate: Date): boolean {
    return checkDate >= startDate && checkDate <= endDate;
  }

}
