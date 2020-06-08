import { Injectable } from '@angular/core';
import { User } from '../Domain/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('sessionUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(dniEmpleado: string, contrasenia: string) {
    return this.http.post<any>(`${environment.apiUrl}/empleado/login`, { dniEmpleado, contrasenia })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('sessionUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('sessionUser');
    this.currentUserSubject.next(null);
  }

}
