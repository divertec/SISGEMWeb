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
}
