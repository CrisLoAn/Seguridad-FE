import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resident } from 'src/app/classes/resident';
import { StudentResidences } from 'src/app/classes/student-residence';
import { studentRecord } from 'src/app/classes/record';
import { Residence } from 'src/app/classes/residence';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private residentBackendURL: string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  findAllResident(): Observable<Resident[]> {
    return this.httpClient.get<Resident[]>(
      `${this.residentBackendURL}/students`
    );
  }

  findAllRecords(): Observable<studentRecord[]> {
    return this.httpClient.get<studentRecord[]>(
      `${this.residentBackendURL}/records`
    );
  }

  findAllStudentResidences(): Observable<StudentResidences[]> {
    return this.httpClient.get<StudentResidences[]>(
      `${this.residentBackendURL}/studentsResidences`
    );
  }
  
  addReport(data:any): Observable<any>{
    return this.httpClient.post(" http://localhost:8080/api/recordPenaltys",data);
    
  }
  deleteStudent(id: number): Observable<any>{
    return this.httpClient.delete(`${this.residentBackendURL}/recordPenaltys'`);
  }


  findAllResidences(): Observable<Residence[]> {
    return this.httpClient.get<Residence[]>(`${this.residentBackendURL}/residences`);
  }
}
