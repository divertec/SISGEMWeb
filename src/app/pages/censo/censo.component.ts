import { Component, OnInit } from '@angular/core';
import { CensoService } from 'src/app/Services/censo.service';
import { Censo } from 'src/app/Domain/Censo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { stringify } from 'querystring';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-censo',
  templateUrl: './censo.component.html',
  styleUrls: ['./censo.component.css'],
  providers: [DatePipe]
})
export class CensoComponent implements OnInit {
  ///DATATABLE
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

  deleteCenso(idCenso: number) {
    this.fetchDeleteCenso(idCenso);
  }


  fetchDeleteCenso(idZona: number) {
    this.censo.deleteCenso(idZona).subscribe((resp: any) => { this.fetchAllCenso(), console.log(resp), error => (console.log(error)) });
  }
  //FETCHS....
  fetchAllCenso() {
    this.censo.getAllCenso().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }


  //MÉTODOS
  onSubmit() {
    const censo = this.registerForm.value;
    censo.fechaFin = this.datePipe.transform(censo.fechaFin, 'dd-MM-yyyy');
    censo.fechaIni = this.datePipe.transform(censo.fechaIni, 'dd-MM-yyyy');
    console.log(JSON.stringify(censo));
    this.censo.insertCenso(censo).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllCenso(), err => console.log(err)), this.isVisible = false });
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
