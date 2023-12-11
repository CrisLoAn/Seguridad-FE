import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YTnestComponent } from './ytnest/ytnest.component';
import { NavComponent } from './shared/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AsideComponent } from './shared/aside/aside.component';
import { StudentsComponent } from './pages/students/students.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { LlamadoAtencionComponent } from './pages/llamado-atencion/llamado-atencion.component';
import { DropdownsComponent } from './shared/dropdowns/dropdowns.component';
import { EditComponent } from './shared/edit/edit.component';
import { RevocacionesListComponent } from './pages/revocaciones-list/revocaciones-list.component';
import { RevocacionesService } from './services/data/revocaciones.service';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { ResidenceConfirmationModalComponent } from './pages/modales/residence-confirmation-modal/residence-confirmation-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PdfComponent } from './pages/pdf/pdf/pdf.component';
import { DocumentosComponent } from './pages/documentacion/documentos/documentos.component';
import { ReportsComponent } from './pages/reports/reports.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { SettingsComponent } from './pages/settings/settings.component';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { HistorialEstudianteComponent } from './pages/historial-estudiante/historial-estudiante.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    YTnestComponent,
    NavComponent,
    AsideComponent,
    StudentsComponent,
    SolicitudComponent,
    ResidenceConfirmationModalComponent,
    PdfComponent,
    DocumentosComponent,
    SolicitudesComponent,
    LlamadoAtencionComponent,
    ResidentComponent,
    DropdownsComponent,
    EditComponent,
    RevocacionesListComponent,
    ReportsComponent,
    SettingsComponent,
    HistorialEstudianteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    CommonModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000, // Time to close the toaster (in milliseconds)
        positionClass: 'toast-top-right' 
      }
    ),
    CommonModule,
    MatExpansionModule,
    CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule,
    MatProgressSpinnerModule,
  ],
  providers: [httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
