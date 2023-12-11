import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RECORD, studentRecord } from 'src/app/classes/record';
import { Record } from 'src/app/classes/repository';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private recordBackendURL: string = "http://localhost:8080/api/records";


  constructor(private httpClient: HttpClient) { }

  findAllRecords(): Observable<studentRecord[]>{
    return this.httpClient.get<studentRecord[]>(`${this.recordBackendURL}`);
  }

  createRecord(record: RECORD){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.recordBackendURL, record, {headers});
  }

  findRecordById(id: number): Observable<RECORD>{
    const url = `http://localhost:8080/api/records/${id}`;
    return this.httpClient.get<RECORD>(url);
  }

  updateRecord(id:number, record: RECORD)
  {
    const url = `${this.recordBackendURL}/${id}`;
    return this.httpClient.put<Record>(url, record);
  }

}
