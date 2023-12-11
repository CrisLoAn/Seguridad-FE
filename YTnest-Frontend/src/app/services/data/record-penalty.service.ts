import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RECORD } from 'src/app/classes/record';
import { RecordPenalty } from 'src/app/classes/record-penalty';
import { RecordPenaltys } from 'src/app/classes/record-penaltys';
@Injectable({
  providedIn: 'root'
})
export class RecordPenaltyService {

  constructor(private httpClient: HttpClient) { }

  private recordPenaltiesBackendURL: string = "http://localhost:8080/api/recordPenaltys";

  createRecordPenalty(recordPenalty: RecordPenaltys): Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const body = JSON.stringify(recordPenalty);
    return this.httpClient.post<RecordPenaltys>(this.recordPenaltiesBackendURL,recordPenalty, {headers});
  }
  
  findAllRecords():Observable<RecordPenaltys[]>{
    return this.httpClient.get<RecordPenaltys[]>(this.recordPenaltiesBackendURL);
  }
}
