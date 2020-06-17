import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cabecera } from '../Domain/Cabecera';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getAllEmpleados() {
    return this.http.get(`${environment.apiUrl}/empleado`)
  }
} 
