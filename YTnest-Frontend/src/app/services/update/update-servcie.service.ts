import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateServcieService {

  dir = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  updateResidenceStudent(id: number, newData: any): Observable<any> {
    const url = `${this.dir}/studentsResidences/${id}`;
    return this.http.put(url, newData);
  }

  updateResidence(id: number, newData: any): Observable<any> {
    const url = `${this.dir}/residences/${id}`;
    return this.http.put(url, newData);
  }
}
