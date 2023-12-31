import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0,email:''});

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest):Observable<User>{
    return this.http.get<User>('././assets/data.json').pipe(
      tap( userData => {
          this.currentUserData.next(userData);
          this.currentUserLoginOn.next(true);
      }),
      catchError(this.handlerError)
    )
  }

  private handlerError(error:HttpErrorResponse)
  {
    if(error.status===0)
    {
      console.error("Se ha producido un error ", error.error);
    }
    else
    {
      console.error("Beckend retornó el código de estado", error.status, error.error)
    }
    return throwError(()=> new Error("Algo falló, intentelo nuevamente!")); 
  }

  get userData():Observable<User>{
      return this.currentUserData.asObservable();
  }
}
