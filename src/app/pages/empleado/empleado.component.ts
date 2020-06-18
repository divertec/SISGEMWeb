import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoService } from "../../Services/empleado.service";
import { Empleados } from 'src/app/Domain/Empleados';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoUsuario } from 'src/app/Domain/TipoUsuario';
import { CensoService } from 'src/app/Services/censo.service';
import { ZonaService } from 'src/app/Services/zona.service';

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
  listOfCenso = []
  listOfZona = []
  ///MODAL
  isVisible = false;
  submitted = false;
  registerForm: FormGroup;
  // asignación Modal
  registerAsignacion: FormGroup;
  isVisibleAsignar = false;
  submittedAsignar = false;

  //SIRVE PARA LIMPIAR LA ETIQUETA
  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(private empleadoService: EmpleadoService, private formBuilder: FormBuilder, private censoService: CensoService, private zonaService: ZonaService) {
  }

  ngOnInit() {
    this.fetchAllEmpleados();
    this.fetchAllTipo();
    this.fetchAllCenso();
    this.fetchAllZona();

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

    this.registerAsignacion = this.formBuilder.group({
      zona: this.formBuilder.group({
        idZona: ''
      }),
      censo: this.formBuilder.group({
        idCenso: ''
      }),
      empleado: this.formBuilder.group({
        dniEmpleado: ''
      }),

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

  asignarEmpleado(dni: string) {
    this.registerAsignacion.get('empleado')!.setValue({ dniEmpleado: dni });
    this.isVisibleAsignar = true;
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
  fetchAllCenso() {
    this.censoService.getAllCenso().subscribe((resp: any) => { this.listOfCenso = resp.data }, error => (console.log(error)));
  }

  fetchAllZona() {
    this.zonaService.getAllZona().subscribe((resp: any) => { this.listOfZona = resp.data }, error => (console.log(error)));
  }
  //MÉTODOS PARA CREAR
  onSubmit() {
    const user = this.registerForm.value;
    this.empleadoService.insertEmpleado(user).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllEmpleados(), err => console.log(err)), this.isVisible = false });
  }
  onSubmitAsignar() {
    const asignacion = this.registerAsignacion.value;
    console.log(asignacion)
    this.empleadoService.insertCensoZona(asignacion).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllEmpleados(), err => console.log(err)), this.isVisibleAsignar = false; })

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

  handleOkAsignar(): void {
    console.log('Button ok clicked!');
    this.isVisibleAsignar = false;
  }

  handleCancelAsignar(): void {
    console.log('Button cancel clicked!');
    this.isVisibleAsignar = false;
  }

}
