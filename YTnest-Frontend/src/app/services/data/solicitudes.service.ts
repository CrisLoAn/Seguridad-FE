import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';


import {Repository} from 'src/app/classes/repository';
import { studentRecord } from 'src/app/classes/record';
import { StudentResidences } from 'src/app/classes/student-residence';
import { Residence } from 'src/app/classes/residence';
import { Cost } from 'src/app/classes/cost';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  public backendURL: string = "http://localhost:8080/api";
  constructor(
    private httpClient: HttpClient
  ) { }

   // Método para obtener todos los datos
   findAllStudents(): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(`${this.backendURL}/students`);
  }

  findAllRecords(): Observable<studentRecord[]> {
    return this.httpClient.get<studentRecord[]>(`${this.backendURL}/records`);
  }

  findAllStudentResidences(): Observable<StudentResidences[]> {
    return this.httpClient.get<StudentResidences[]>(`${this.backendURL}/studentsResidences`);
  }

  findAllResidences(): Observable<Residence[]> {
    return this.httpClient.get<Residence[]>(`${this.backendURL}/residences`);
  }
  findAllCosts(): Observable<Cost[]> {
    return this.httpClient.get<Cost[]>(`${this.backendURL}/costs`);
  }
}
//----------------




