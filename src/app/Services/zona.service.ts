import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  constructor(private http: HttpClient) {
  }

  getAllZona() {
    return this.http.get(`${environment.apiUrl}/zona/`);
  }
  insertZona(zona: string) {
    return this.http.post(`${environment.apiUrl}/zona/`, zona);
  }
  updateZona(zona: string, idZona: number) {
    return this.http.put(`${environment.apiUrl}/zona/${idZona}`, zona);
  }
  deleteCenso(dni: string) {
    return this.http.delete(`${environment.apiUrl}/censo/${dni}`);
  }

}
