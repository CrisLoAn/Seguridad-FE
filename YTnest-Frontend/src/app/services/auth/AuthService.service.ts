import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080/api/auth/';
const USER_KEY = 'auth-nest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;
  identificador: number;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );   
  }

  logout(): Observable<any> {
    localStorage.removeItem(USER_KEY);
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  setUserData(data: any): void {
    this.userData = data;
  }

  getUserData(): any {
    const storedData = localStorage.getItem(USER_KEY);
    
    if (storedData) {
      const data = JSON.parse(storedData);
      const iden = data.student.student_id;
      const nombre = data.student.studentFirstName;
      const apellido = data.student.studentLastName;
      const gsec = data.student.studentGSEC;
      const gender = data.student.studentGender;
      this.setUserData({ ID: iden, NAME: nombre, APELLIDO: apellido, GSEC: gsec, Gender: gender });
    }

    return this.userData;
  } 

  public setStudentIdentificador(dato: number): void {
    this.identificador = dato;
  }

  public getStudentIdentificador(): number {
    return this.identificador;
  }

}
