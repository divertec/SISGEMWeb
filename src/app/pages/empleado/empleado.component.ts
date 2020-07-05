import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoService } from "../../Services/empleado.service";
import { Empleados } from 'src/app/Domain/Empleados';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TipoUsuario } from 'src/app/Domain/TipoUsuario';
import { CensoService } from 'src/app/Services/censo.service';
import { ZonaService } from 'src/app/Services/zona.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Empleado } from 'src/app/Domain/Empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  ///DATATABLE
  loadingIMG = false;
  imageSource;
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

  //VERIFICAR EL USUASRIO LE CORRESPONDE TENER EL ACCESO A CREAR NUEVOS USUARIOS
  newEmpleado: boolean = false;
  tipEmpleado: number = 0;
  //patern
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private empleadoService: EmpleadoService, private formBuilder: FormBuilder, private censoService: CensoService, private zonaService: ZonaService, private sanitizer: DomSanitizer, private authEmpleado: AuthenticationService) {
    this.tipEmpleado = this.authEmpleado.currentEmpleadoValue.data.tipoUsuario.tipId;
  }

  ngOnInit() {

    // VALIDACIÓN DE USUASRIO, SI PUEDE EDITAR
    this.newEmpleado = this.authEmpleado.currentEmpleadoValue.data.tipoUsuario.tipId == 5 ? true : false;

    this.fetchAllEmpleados();
    this.fetchAllTipo();
    this.fetchAllCenso();
    this.fetchAllZona();

    this.registerForm = this.formBuilder.group({
      dniEmpleado: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      contrasenia: 'password',
      nombres: new FormControl('', [Validators.required, Validators.minLength(5)]),
      celular: new FormControl('', [Validators.required, Validators.minLength(6)]),
      correo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      sexo: new FormControl('', [Validators.required]),
      tipoUsuario: this.formBuilder.group({
        tipId: new FormControl('', [Validators.required]),
      }),
      direccionDomicilio: new FormControl('', [Validators.required, Validators.minLength(5)]),
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

  //GETTERS 
  get dniEmpleado() { return this.registerForm.get('dniEmpleado'); }
  get nombres() { return this.registerForm.get('nombres') };
  get celular() { return this.registerForm.get('dniEmpleado') };
  get correo() { return this.registerForm.get('correo') };
  get sexo() { return this.registerForm.get('sexo') };
  get tipId() { return this.registerForm.get('tipId') };
  get direccionDomicilio() { return this.registerForm.get('direccionDomicilio') };

  //CUANDO SE INGRESA UNA IMAGEN
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.registerForm.get('base64Img').setValue(myReader.result);
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${myReader.result}`)
      this.loadingIMG = true;
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
    this.fetchAllEmpleados();
    console.log(dni);

  }
  asignarEmpleadoDirecto(dni: string) {

    let censo = this.authEmpleado.currentEmpleadoValue.data.censoZona.censo.idCenso;
    let zona = this.authEmpleado.currentEmpleadoValue.data.censoZona.zona.idZona;
    const censoZona = JSON.stringify({ zona: { idZona: zona }, censo: { idCenso: censo }, empleado: { dniEmpleado: dni } })
    this.empleadoService.asssignarCensoZona(censoZona).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllEmpleados(), err => console.log(err)), this.isVisible = false });
    this.fetchAllEmpleados()
    console.log(dni)
  }

  fetchAllEmpleados() {
    console.log("antes")
    let censo = this.authEmpleado.currentEmpleadoValue.data.censoZona != null ? parseInt(this.authEmpleado.currentEmpleadoValue.data.censoZona.censo.idCenso) : 0;

    console.log("despues")
    if (this.authEmpleado.currentEmpleadoValue.data.tipoUsuario.tipId == 2) {
      this.empleadoService.getAllEmpleados(3, censo).subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => { (console.log(error)), this.loading = false });
    } else if (this.authEmpleado.currentEmpleadoValue.data.tipoUsuario.tipId == 3) {
      this.empleadoService.getAllEmpleados(4, censo).subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => { (console.log(error)), this.loading = false });
    } else if (this.authEmpleado.currentEmpleadoValue.data.tipoUsuario.tipId == 5) {
      this.empleadoService.getAllEmpleados2().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => { (console.log(error)), this.loading = false });
    }

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
    this.registerForm.reset();
  }
  onSubmitAsignar() {
    const asignacion = this.registerAsignacion.value;
    console.log(asignacion)
    this.empleadoService.insertCensoZona(asignacion).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllEmpleados(), err => console.log(err)), this.isVisibleAsignar = false; })
    this.registerAsignacion.reset();
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
