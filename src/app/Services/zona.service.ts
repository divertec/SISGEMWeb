import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  constructor(private http: HttpClient) {
  }

  getAllEmpleados() {
    return this.http.get(`${environment.apiUrl}/zona/`);
  }

}
