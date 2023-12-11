import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Penalties } from 'src/app/classes/penalties';

@Injectable({
  providedIn: 'root'
})
export class PenaltiesService {

  private studentsBackendURL: string = "http://localhost:8080/api/penaltys";

  constructor(
    private httpClient: HttpClient
  ) { }

  findAllPenalties(): Observable<Penalties[]>{
    return this.httpClient.get<Penalties[]>(`${this.studentsBackendURL}`);
  }

  findPenaltyById(id:number): Observable<Penalties>{
    const url = `http://localhost:8080/api/penaltys`;
    return this.httpClient.get<any>(`${url}/${id}`);
  }
}
