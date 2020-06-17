import { Injectable } from '@angular/core';
import { Empleado } from '../Domain/Empleado';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentEmpleadoSubject: BehaviorSubject<Empleado>;
  public currentEmpleado: Observable<Empleado>;

  constructor(private http: HttpClient) {
    this.currentEmpleadoSubject = new BehaviorSubject<Empleado>(JSON.parse(localStorage.getItem('sessionEmpleado')));
    this.currentEmpleado = this.currentEmpleadoSubject.asObservable();

  }

  public get currentEmpleadoValue(): Empleado {
    return this.currentEmpleadoSubject.value;
  }

  login(dniEmpleado: string, contrasenia: string) {
    return this.http.post<any>(`${environment.apiUrl}/empleado/login`, { dniEmpleado, contrasenia })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('sessionEmpleado', JSON.stringify(user));
        this.currentEmpleadoSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('sessionEmpleado');
    this.currentEmpleadoSubject.next(null);
  }

}
