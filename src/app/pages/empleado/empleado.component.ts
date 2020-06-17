import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from "../../Services/empleado.service";
import { Empleados } from 'src/app/Domain/Empleados';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  ///DATATABLE
  searchValue = '';
  visible = false;
  loading = true;
  listOfData = [];
  listOfDisplayData = [];
  ///MODAL
  isVisible = false;
  dni = '';




  constructor(private empleadoService: EmpleadoService) {
  }
  ngOnInit() {
    this.fetchAllEmpleados();
  }

  ver() {
    console.log(JSON.stringify(this.listOfDisplayData));
  }


  deleteEmpleado(dni: string) {

  }
  editEmpleado(dni: string) {

  }

  newEmpleado() {
    this.isVisible = true;
  }

  fetchAllEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }

  //DATATABLES
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: Empleados) => item.nombres.indexOf(this.searchValue) !== -1);
  }

  //MODAL
  /*showModal(): void {
    this.isVisible = true;
  }*/

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
