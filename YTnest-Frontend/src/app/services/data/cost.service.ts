import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost} from 'src/app/classes/cost';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CostService {
  //Endpoint del backend
  private costsBackendURL: string = "http://localhost:8080/api/costs";
  constructor(
    private httpClient: HttpClient
  ) { }

  findAllCosts():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.costsBackendURL}`);
  }

}
