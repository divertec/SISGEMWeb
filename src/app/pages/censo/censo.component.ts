import { Component, OnInit, SimpleChange } from '@angular/core';
import { CensoService } from 'src/app/Services/censo.service';
import { Censo } from 'src/app/Domain/Censo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DatePipe } from '@angular/common';
import { isInteger } from 'ng-zorro-antd/core/util';

let almacenValor: boolean = false;

@Component({
  selector: 'app-censo',
  templateUrl: './censo.component.html',
  styleUrls: ['./censo.component.css'],
  providers: [DatePipe]
})
export class CensoComponent implements OnInit {
  ///DATATABLE
  visibleTable = true;
  searchValue = '';
  visible = false;
  loading = true;
  listOfData = [];
  listOfDisplayData = [];
  ///MODAL
  isVisible = false;
  submitted = false;
  registerForm: FormGroup;
  dateFormat: string
  //VERIFICAR SI EXISTE UN CENSO PENDIENTE
  censoPendiente: boolean = false;
  //ALERTA 
  isVisibleAlert: boolean = false;



  constructor(private censo: CensoService, private formBuilder: FormBuilder, private authEmpleado: AuthenticationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchAllCenso();
    this.dateFormat = 'dd-MM-yyyy';
    this.registerForm = this.formBuilder.group({
      nomCenso: '',
      fechaIni: '',
      fechaFin: '',
      creoCenso: {
        dniEmpleado: this.authEmpleado.currentEmpleadoValue.data.dniEmpleado
      }
    })
  }

  editCenso(idCenso: number) {

  }

  editEstado($event, tipo: string, idcenso: number) {
    let estadoTipo = 0;
    if ($event == true) {
      //el tipo sube 1 estado
      estadoTipo = parseInt(tipo) + 1;
    } else {
      estadoTipo = parseInt(tipo);
    }
    const censo = JSON.stringify({ idCenso: idcenso, estado: String(estadoTipo) })
    this.censo.updateEstado(censo).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllCenso(), err => console.log(err)), this.isVisible = false, this.visibleTable = true });
  }
  deleteCenso(idCenso: number) {
    this.fetchDeleteCenso(idCenso);
  }

  fetchEditCenso(idCenso: number) {
    //this.censo.updateCenso(idCenso).subscribe((resp) => { console.log(resp));
  }

  fetchDeleteCenso(idZona: number) {
    this.censo.deleteCenso(idZona).subscribe((resp: any) => { this.fetchAllCenso(), console.log(resp), error => (console.log(error)) });
  }
  //FETCHS....
  fetchAllCenso() {
    this.censo.getAllCenso().subscribe((resp: any) => {
      resp.data.forEach((x) => {
        if (x.estado == 1 || x.estado == 2) {
          //validar si existe censos pendientes
          this.censoPendiente = true;
        }
      }); resp.data, this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false
    }, error => {
      if (error == "OK") {
        this.visibleTable = false;
        this.censoPendiente = false;
      }
    });
  }


  //MÉTODOS
  onSubmit() {
    const censo = this.registerForm.value;
    censo.fechaFin = this.datePipe.transform(censo.fechaFin, 'dd-MM-yyyy');
    censo.fechaIni = this.datePipe.transform(censo.fechaIni, 'dd-MM-yyyy');
    console.log(JSON.stringify(censo));
    this.censo.insertCenso(censo).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllCenso(), err => console.log(err)), this.isVisible = false, this.visibleTable = true });
    this.registerForm.reset();
  }
  onSubmitEdit() {

  }

  //DATATABLES
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: Censo) => item.nomCenso.indexOf(this.searchValue) !== -1);
  }

  //MODAL
  showModal(): void {
    if (this.censoPendiente == true) {
      this.isVisibleAlert = true;
      console.log("entro a alerta true")
    } else {
      this.isVisible = true;
      console.log("entro a isvisible map")
    }
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
