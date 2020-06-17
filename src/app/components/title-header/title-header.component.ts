import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Empleado } from 'src/app/Domain/Empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css']
})
export class TitleHeaderComponent implements OnInit {

  @Input() title: string;

  userLoggedIn: Empleado

  constructor(private authEmpleado: AuthenticationService) {
    this.userLoggedIn = this.authEmpleado.currentEmpleadoValue
  }

  ngOnInit() {
  }




}
