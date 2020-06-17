import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CensoService {

  constructor(private http: HttpClient) { }

  getAllCenso() {
    return this.http.get(`${environment.apiUrl}/censo/`);
  }

  insertCenso(censo: string) {
    return this.http.post(`${environment.apiUrl}/censo/`, censo);
  }

  updateCenso(censo: string, idcenso: number) {
    return this.http.put(`${environment.apiUrl}/censo/${idcenso}`, censo);
  }
  deleteCenso(dni: string) {
    return this.http.delete(`${environment.apiUrl}/censo/${dni}`);
  }

}
