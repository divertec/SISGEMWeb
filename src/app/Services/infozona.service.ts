import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfozonaService {

  constructor(private http: HttpClient) {
  }

  getAllInfoZona(idCenso: number, idZona: number) {
    return this.http.get(`${environment.apiUrl}/persona/censoZona?idCenso=${idCenso}&idZona=${idZona}`);
  }
}
