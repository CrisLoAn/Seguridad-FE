import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/classes/student';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //Endpoint del backend
  private studentsBackendURL: string = "http://localhost:8080/api/students";
  constructor(
    private httpClient: HttpClient
  ) { }

   findAllStudents():Observable<Student[]>{
     return this.httpClient.get<Student[]>(`${this.studentsBackendURL}`);
   }

  //findAllStudents(pageNumber: number, pageSize: number): Observable<any> {
 //   return this.httpClient.get<any>(`${this.studentsBackendURL}/${pageNumber}/${pageSize}`);
 // }

  getStudentById(id: number): Observable<any> {
    const url = `http://localhost:8080/api/students/${id}`;
    return this.httpClient.get<any>(url);
  }

  hasResidence(student: any): boolean {

    if (!student.studentResidences || student.studentResidences.length === 0) {
      return false; // El estudiante no tiene residencias o la lista de residencias está vacía
    }

    return student.studentResidences.some(residence => residence.ednDateDeal === null);
  }

  getResidence(student: any): any[] {
    if (!student.studentResidences || student.studentResidences.length === 0) {
      return []; // El estudiante no tiene residencias o la lista de residencias está vacía
    }
  
    return student.studentResidences.filter(residence => residence.ednDateDeal === null);
  }


}
