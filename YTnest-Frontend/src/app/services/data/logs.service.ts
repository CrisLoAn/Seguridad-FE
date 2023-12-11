import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Logs } from "src/app/classes/logs";

@Injectable({
    providedIn: 'root'
  })
  export class LogsService {
    //Endpoint del backend
    private logsBackendURL: string = "http://localhost:8080/api/tablesLogs";
    constructor(
      private httpClient: HttpClient
    ) { }
  
    createLOG(log: any){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post(this.logsBackendURL, log, {headers});
    }

  }