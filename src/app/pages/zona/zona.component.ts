import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/Domain/Zona';
import { ZonaService } from 'src/app/Services/zona.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {
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

  constructor(private zona: ZonaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchAllZonas();
    this.registerForm = this.formBuilder.group({
      zonas: '',
      descripcion: '',
      cantidadEmpleados: ''
    });
  }

  editZona(idZona: number) { }
  deleteZona(idZona: number) { }

  //FETCHS....
  fetchAllZonas() {
    this.zona.getAllZona().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }

  //Método
  onSubmit() {
    const zona = this.registerForm.value;
    console.log(JSON.stringify(zona));
    this.zona.insertZona(zona).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllZonas(), err => console.log(err)) });
  }



  //DATATABLES
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: Zona) => item.zonas.indexOf(this.searchValue) !== -1);
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
