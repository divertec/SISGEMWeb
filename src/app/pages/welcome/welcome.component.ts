import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/Domain/Empleado';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  isCollapsed = false;
  currentEmpleado: Empleado;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentEmpleado.subscribe(x => this.currentEmpleado = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }



}
