import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empleados } from '../Domain/Empleados';
import { TipoUsuario } from '../Domain/TipoUsuario';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getAllEmpleados(tipoEmpleado: number, idcenso: number) {
    return this.http.get(`${environment.apiUrl}/empleado/disponibles?idTipo=${tipoEmpleado}&idCenso=` + idcenso);
  }
  getAllEmpleados2() {
    return this.http.get(`${environment.apiUrl}/empleado`);
  }

  getAllTipo() {
    return this.http.get(`${environment.apiUrl}/tipoUsuario/`);
  }

  insertEmpleado(empleado: string) {
    return this.http.post(`${environment.apiUrl}/empleado/`, empleado);
  }

  insertCensoZona(empleado: string) {
    return this.http.post(`${environment.apiUrl}/persCensoZona/`, empleado);
  }

  updateEmpleado(empleado: string, dni: string) {
    return this.http.put(`${environment.apiUrl}/empleado/${dni}`, empleado);

  }
  deleteEmpleado(dni: string) {
    return this.http.delete(`${environment.apiUrl}/empleado/${dni}`);
  }

  asssignarCensoZona(censozona: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${environment.apiUrl}/persCensoZona/`, censozona, { headers: headers });
  }

} 
