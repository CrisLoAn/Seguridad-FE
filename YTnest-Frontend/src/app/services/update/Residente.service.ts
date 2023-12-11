import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {
  private residenteData: any;

  constructor() {}

  setData(data: any) {
    this.residenteData = data;
  }

  getData() {
    return this.residenteData;
  }
}
