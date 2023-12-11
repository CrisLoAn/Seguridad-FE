import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residence } from 'src/app/classes/residence';
import { Cost } from 'src/app/classes/cost';



@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  //Endpoint del backend
  private residencesBackendURL: string = "http://localhost:8080/api/residences";

  constructor(
    private httpClient: HttpClient
  ) { }

  findAllResidences():Observable<any[]>{
    return this.httpClient.get<any[]>(this.residencesBackendURL);
  }

  getResidencesByGender(gender: string): Observable<Residence[]> {
    const url = `${this.residencesBackendURL}/filterByGender/${gender}`;
    return this.httpClient.get<Residence[]>(url);
  }

  getResidenceById(id: number):Observable<any>{
      return this.httpClient.get<any>(`${this.residencesBackendURL}/${id}`);
  }

  // Definimos la función getResidenceByStudentResidenceId
//   getResidenceByStudentResidenceId(residences: any[], studentResidenceId: number): any | null {
//   const data = residences;
//   const targetResidence = data.find(residence =>
//     residence.studentResidence &&
//     residence.studentResidence.some(studentResidence => studentResidence.studentResidenceId === studentResidenceId) && residence.residenceAvailability === 'O'
//   );
//   return targetResidence || null;
// }

getResidenceByStudentResidenceId(residences: any, studentResidenceId: number): any | null {
  const targetResidence = residences.find(residence =>
    residence.studentResidence && Array.isArray(residence.studentResidence) &&
    residence.studentResidence.some(studentResidence => studentResidence.studentResidenceId === studentResidenceId) &&
    residence.residenceAvailability === 'O'
  );
  return targetResidence || null;
}


actualizarResidenceAvailability(residenceId: number, residencia: any) {
  if (residencia) {
    residencia.residenceAvailability='O';
    console.log("Residencia a modificar",residenceId, residencia)
    this.httpClient.put(`${this.residencesBackendURL}/${residenceId}`, residencia)
      .subscribe(
        () => {
          console.log('Campo residenceAvailability actualizado en residencesData');
        },
        error => {
          console.error('Error actualizando residenceAvailability:', error);
        }
      );
  }
}

}
