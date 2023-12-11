import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logs } from 'src/app/classes/logs';
import { Student } from 'src/app/classes/student';
import { AuthService } from 'src/app/services/auth/AuthService.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { StorageService } from 'src/app/services/auth/storage.service';
import { IpService } from 'src/app/services/data/IP.service';
import { LogsService } from 'src/app/services/data/logs.service';
import { StudentService } from 'src/app/services/data/student.service';
import { ToasterService } from 'src/app/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ipAddress: string;
  form: any = {
    username : null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  imagenFondo: string;
  loginError:string=""


  loginForm=this.formBuilder.group(
    {
      email:['nombre.apellido@yachaytech.edu.ec',[Validators.required,Validators.email]],
      key:['',Validators.required],
    }
  )

    constructor(private formBuilder:FormBuilder, 
      private router:Router, 
      private loginService:LoginService,
      private storageService: StorageService, 
      private http: HttpClient, 
      private toasterService: ToasterService, 
      private logService: LogsService,
      private ipService: IpService,
      private authService: AuthService){
      this.imagenFondo = 'src/assets/images/loginFoto.jpg';
    }

    ngOnInit(): void {
      this.ipService.getIpAddress().subscribe(
        (data: any) => {
          this.ipAddress = data.ip;
        },
        error => {
          console.error('Error fetching IP address:', error);
        }
      );
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['/YTnest']);
      }
    }
    get email(){
      return this.loginForm.controls.email;
    }
    get key(){
      return this.loginForm.controls.key;
    }
  

    login() {
      const {username, password= this.key} = this.form;
      console.log("form data, ", this.form);
      this.authService.login(username, password).subscribe({
        next: data => {
          console.log("Data traida junto al JWT", data)
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.showToaster();
          this.registerLog(username,"POST-GET","Auth granted");
          this.router.navigate(['/YTnest']);
        },
        error: err => {
          if(err.status === 429)
          {
              this.showToasterWarning("Limite de operaciones excedido, demasiadas solicitudes en menos de 2 minutos");
          }
          else
          {
          this.showToasterfail();
          //console.log("Error ISs", err);
          this.isLoginFailed=true;
          this.registerLog(username,"POST-GET","Auth fail");
          }
        }
      })

    }

    registerLog(id : string, res: String, estado: string){
      const LOG: Logs = {
        logId:0,
        logDate: new Date(),
        logUser: id,
        logTerminal: this.ipAddress,
        logObservations: estado,
        logProcedureName: res.toUpperCase(),
        schemeTable: null,
      }
      this.logService.createLOG(LOG).subscribe((response)=>{
        this.showToasterInfo("Log generado exitosamente!")
      },
      (error) =>{
        this.showToasterInfo("algo falló al generar el Log!");
      });
    }
    
    reloadPage(): void {
      window.location.reload();
    }

    showToaster() {
      this.toasterService.success('Inicio exitoso! Bienvenido', 'Success');
    }

    showToasterfail(){
      this.toasterService.error("Algo salió mal","error");
    }

    showToasterWarning(msg: string){
      this.toasterService.warning(msg , "warning");
    }

    showToasterInfo(msg: string){
      this.toasterService.info(msg, 'info');
    }
}
