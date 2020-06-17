import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from "../../Services/empleado.service";
import { Cabecera } from 'src/app/Domain/Cabecera';
import { Empleados } from 'src/app/Domain/Empleados';
import { first } from 'rxjs/operators';
import { Empleado } from 'src/app/Domain/Empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  searchValue = '';
  visible = false;
  loading = true;
  listOfData = [];
  listOfDisplayData = [];

  constructor(private empleadoService: EmpleadoService) {
  }
  ngOnInit() {
    this.fetchAllEmpleados();
  }

  ver() {
    console.log(JSON.stringify(this.listOfDisplayData));
  }

  fetchAllEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: Empleados) => item.nombres.indexOf(this.searchValue) !== -1);
  }


}
