import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { YTnestComponent } from './ytnest/ytnest.component';
import { StudentsComponent } from './pages/students/students.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { DocumentosComponent } from './pages/documentacion/documentos/documentos.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { LlamadoAtencionComponent } from './pages/llamado-atencion/llamado-atencion.component';
import { RevocacionesListComponent } from './pages/revocaciones-list/revocaciones-list.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HistorialEstudianteComponent } from './pages/historial-estudiante/historial-estudiante.component';


const routes: Routes = [
  {path:'',redirectTo:'/YTnest', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path:'Estudiantes', component:StudentsComponent, canActivate:[AuthGuard]},
  {path: 'YTnest', component:YTnestComponent, canActivate:[AuthGuard], children:[
  {path: 'students', component:StudentsComponent},
  {path: 'solicitud', component:SolicitudComponent},
  {path: 'solicitudes', component: SolicitudesComponent },
  {path: 'documentos', component:DocumentosComponent},
  {path: 'llamadoAtencion', component: LlamadoAtencionComponent },
  {path: 'revocaciones', component: RevocacionesListComponent },
  {path: 'reports', component: ReportsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'historial-estudiante', component: HistorialEstudianteComponent}
]},
{ path: '**', redirectTo: '/YTnest' },
  
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
