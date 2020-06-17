import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from "../../Services/empleado.service";
import { Empleados } from 'src/app/Domain/Empleados';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  listOfTipo = [];
  ///MODAL
  isVisible = false;
  submitted = false;
  registerForm: FormGroup;


  constructor(private empleadoService: EmpleadoService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.fetchAllEmpleados();

    console.log(JSON.stringify(this.fetchAllTipo()));
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  //SERVICES --------   
  deleteEmpleado(dni: string) {

  }

  editEmpleado(dni: string) {

  }

  fetchAllEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }
  fetchAllTipo() {
    this.empleadoService.getAllTipo().subscribe((resp: any) => this.listOfTipo = resp.data, err => console.log(err))
  }
  //MÉTODOS
  onSubmit() {

  }
  newEmpleado() {
    this.isVisible = true;
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
  showModal(): void {
    this.isVisible = true;


  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
