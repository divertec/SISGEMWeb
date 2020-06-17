import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoService } from "../../Services/empleado.service";
import { Empleados } from 'src/app/Domain/Empleados';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoUsuario } from 'src/app/Domain/TipoUsuario';

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

  //SIRVE PARA LIMPIAR LA ETIQUETA
  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(private empleadoService: EmpleadoService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.fetchAllEmpleados();
    this.fetchAllTipo();
    this.registerForm = this.formBuilder.group({
      dniEmpleado: null,
      contrasenia: 'password',
      nombres: '',
      celular: '',
      correo: '',
      sexo: '',
      tipoUsuario: this.formBuilder.group({
        tipId: ''
      }),
      direccionDomicilio: '',
      base64Img: null

    });
  }

  //CUANDO SE INGRESA UNA IMAGEN
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.registerForm.get('base64Img').setValue(myReader.result);
    }
    myReader.readAsDataURL(file);
  }
  //------------------------------------------

  get f() { return this.registerForm.controls; }

  //SERVICES --------   
  deleteEmpleado(dni: string) {
    this.fetchDelteEmpleado(dni);
    console.log(dni);
  }

  editEmpleado(dni: string) {
    console.log(dni);
  }

  fetchAllEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }
  fetchAllTipo() {
    this.empleadoService.getAllTipo().subscribe((resp: any) => this.listOfTipo = resp.data, err => console.log(err))
  }
  fetchDelteEmpleado(dni: string) {
    this.empleadoService.deleteEmpleado(dni).subscribe((resp: any) => { console.log(resp), this.fetchAllEmpleados(), err => console.log(err) });
  }
  //MÉTODOS
  onSubmit() {
    const user = this.registerForm.value;
    this.empleadoService.insertEmpleado(user).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllEmpleados(), err => console.log(err)) });
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
