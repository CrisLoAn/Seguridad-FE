// settings.component.ts

import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/data/settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings } from 'src/app/classes/settings';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { ToasterService } from 'src/app/toaster.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  editForm: FormGroup;
  settingsData: Settings[] = [];
  settingsDataActive: Settings[] = [];
  settingsInitDate: Date | null = null;  // Variable para almacenar la fecha

  elementsPerPage = 10;
  currentPage = 1;

  searchTerm: string = '';
  reservarResidenciaEnabled: boolean = true;
  
  isButtonDisabled: boolean = true;
  isButtonDisabledGenerar: boolean = false;

  displayedColumns: string[] = ['settingInitDate', 'settingEndDate', 'settingDescription', 'status'];
  displayedColumns2: string[] = ['settingInitDate', 'settingEndDate', 'settingDescription', 'status', 'actions'];
  showActionsColumnt2 = false;
  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private toasterService: ToasterService,
  ) {
    this.editForm = this.fb.group({
      fApertura: ['', Validators.required],
      fCierre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSettings();
    this.activationSolicitud();
    this.getFilteredSettingsData();
  }

  enableButton() {
    this.isButtonDisabled = false;
    this.isButtonDisabledGenerar = true;
  }

  // Puedes agregar más lógica o acciones según tus necesidades
  onButtonClick() {
     //console.log(this.editForm.value)
     const newSettings: Settings = {
      setting_id:0,
      settingInitDate: new Date(this.editForm.get('fApertura').value),
      settingEndDate: new Date(this.editForm.get('fCierre').value),
      settingDescription: this.editForm.get('descripcion').value,
      status: (this.editForm.get('estado').value === 'one') ? 'A' : 'I',
     };
     console.log("Objeto creado", newSettings);
     this.settingsService.createSetting(newSettings).subscribe((response)=>{
        this.showToaster('Sistema aperturado con exito!');
     },
     (error)=>{
      this.showToasterfail('Vaya! parece que algo salió mal')
     });
  }

  private getSettings() {
    this.settingsService.getAllSettings().subscribe(
      
      (settingsData: Settings[]) => {
        this.settingsData = settingsData;
        
      },
      error => {
        console.error('Error fetching settings data:', error);
      }
    );
  }

  getInitDate(): Date | null{
    if (this.settingsData.length === 0) {
      return null; 
    }
    const n = this.settingsData[this.settingsData.length - 1].setting_id
    const filteredSettingsData = this.settingsData.find(
      (setting) => setting.setting_id === n
    );
    const initDate = new Date(filteredSettingsData.settingInitDate);
    return initDate
  }

  getEndDate(): Date | null{
    if (this.settingsData.length === 0) {
      return null; 
    }
    const n = this.settingsData[this.settingsData.length - 1].setting_id
    const filteredSettingsData = this.settingsData.find(
      (setting) => setting.setting_id === n
    );
    const endDate = new Date(filteredSettingsData.settingEndDate);
    return endDate
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


  isOnTime(): boolean {
    if (this.settingsData.length === 0) {
      return false; 
    }
    const n = this.settingsData[this.settingsData.length - 1].setting_id
    const filteredSettingsData = this.settingsData.find(
      (setting) => setting.setting_id === n
    );
    const currentDate = new Date();
    const endDate = new Date(filteredSettingsData.settingEndDate);
    const initDate = new Date(filteredSettingsData.settingInitDate);

    if (initDate <= currentDate && currentDate <= endDate){
      return true;
    }

    return false
  } 

  desactivar(settingValues: Settings): boolean | null {
    const n = settingValues.setting_id;

  // Puedes acceder directamente a settingValues.status
  if (settingValues.status === 'A') {
    settingValues.status = 'I';

    // Realizar la llamada a tu servicio para actualizar el estado en la base de datos
    this.http.put(`${this.settingsService.backendURL}/settings/${n}`, settingValues)
      .subscribe(
        (response) => {
          this.showToasterInfo('Periodo de postulaciones, cerrado existosamente!');
          // console.log('Configuración desactivada con éxito', response);
          setTimeout(() => {
            // Aquí puedes agregar la lógica para recargar la página si es necesario
            window.location.reload();
          }, 5 * 1000);
        },
        (error) => {
          this.showToasterfail('Vaya! parece que algo salió mal.');
          // console.error('Error al desactivar la configuración:', error);
        }
      );

    return false;
  }
  return true;
    // console.log('Desactivar:', settingValues);
    // const n = this.settingsData[this.settingsData.length-1].setting_id
    // const filteredSettingsData = this.settingsData.find(
    //   (setting) => setting.setting_id === n
    // );
    //   console.log("data", filteredSettingsData);
    // if (filteredSettingsData.status === 'A'){
    //   filteredSettingsData.status = 'I';
    //   this.http.put(`${this.settingsService.backendURL}/settings/${n}`, filteredSettingsData)
    //     .subscribe(
    //       (response) => {
    //         this.showToasterInfo('Periodo de postulaciones, cerrado existosamente!');
    //         //console.log('Configuración activada con éxito', response);
    //       },
    //       (error) => {
    //         this.showToasterfail('Vaya! parece que algo salió mal.');
    //         //console.error('Error al activar la configuración:', error);
    //       }
    //     );
    //   return false
    // }
    // return true
  }

  activar(): boolean | null {
    if (this.settingsData.length === 0) {
      return null; 
    }
    const n = this.settingsData[this.settingsData.length - 1].setting_id
    const filteredSettingsData = this.settingsData.find(
      (setting) => setting.setting_id === n
    );
  
    if (filteredSettingsData.status == 'I'){
      filteredSettingsData.status = 'A';
      this.http.put(`${this.settingsService.backendURL}/settings/${n}`, filteredSettingsData)
        .subscribe(
          (response) => {
            console.log('Configuración activada con éxito', response);
          },
          (error) => {
            console.error('Error al activar la configuración:', error);
          }
        );
  
      return true;
    }

    if (this.isOnTime()){
      filteredSettingsData.status = 'I';
    }

    return false;
  }
  
  getStatusDescription(status: string): string {
    return status === 'A' ? 'Activo' : 'Inactivo';
  }
  
  // Método para filtrar registros por estado 'A'
  getFilteredSettingsData(): any[] {
    return this.settingsData.filter(setting => setting.status === 'A');
  }

  private activationSolicitud() {
    
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
