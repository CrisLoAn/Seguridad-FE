import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/classes/settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public backendURL: string = "http://localhost:8080/api";
    constructor(
        private httpClient: HttpClient
    ) { }

    getAllSettings():Observable<Settings[]>{
        return this.httpClient.get<Settings[]>(`${this.backendURL}/settings`);
    }

    createSetting(settingObject: any): Observable<any> {
        return this.httpClient.post<any>(`${this.backendURL}/settings`, settingObject);
      }      
}