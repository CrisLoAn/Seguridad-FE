import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/classes/student';
import { forkJoin } from 'rxjs';
import { StudentResidence, StudentResidences } from 'src/app/classes/student-residence';
import { Cost } from 'src/app/classes/cost';


@Injectable({
  providedIn: 'root'
})
export class StudentResidenceService {
  //Endpoint del backend
  private studentsBackendURL: string = "http://localhost:8080/api/students";
  private mailerURL: string = "http://localhost:8080/api/email/sendMail";
  constructor(
    private httpClient: HttpClient
  ) { }


  getStudentResidenceById(id: number): Observable<any> {
    const url = `http://localhost:8080/api/studentsResidences/${id}`;
    return this.httpClient.get<any>(url);
  }

  associateStudentResidence(studen_residence: any): Observable<any>
  {
    const url = 'http://localhost:8080/api/studentsResidences';
    return this.httpClient.post<any>(url, studen_residence);
  }
  
  addStudentResidence(studentResidence: any): Observable<any> {
    const url = 'http://localhost:8080/api';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(studentResidence);
    return this.httpClient.post<any>(`${url}/SR`, body, { headers });
  }

  sendEmail(mail: any): Observable<string>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(mail);
    return this.httpClient.post<string>(this.mailerURL, body, { headers });
  }

}
