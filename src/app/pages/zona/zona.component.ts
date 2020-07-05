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
  editForm: FormGroup;

  //modal edit
  isVisibleEdit = false;
  ///guardar id
  idEdit: number = 0;
  constructor(private zona: ZonaService, private formBuilder: FormBuilder, private formEdit: FormBuilder) { }

  ngOnInit(): void {
    this.fetchAllZonas();
    this.registerForm = this.formBuilder.group({
      zonas: '',
      descripcion: '',
      cantidadEmpleados: ''
    });

    this.editForm = this.formEdit.group({
      zonas: '',
      descripcion: '',
      cantidadEmpleados: ''
    })

  }

  editZona(idZona: number) {
    console.log(idZona);
    this.idEdit = idZona;
    this.zona.findZona(idZona).subscribe((resp: any) => {
      console.log(resp.data);
      this.editForm.setValue({
        zonas: resp.data.zonas,
        descripcion: resp.data.descripcion,
        cantidadEmpleados: resp.data.cantidadEmpleados
      })
      //this.editForm.controls['zonas'].setValue(resp.data.zonas);
      //this.editForm.get('zonas').setValue({ zonas: resp.data.zonas })
    })
    this.showModalEdit();

  }
  deleteZona(idZona: number) {
    this.fetchDeletezona(idZona)
  }

  //FETCHS....
  fetchAllZonas() {
    this.zona.getAllZona().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
  }
  fetchDeletezona(idZona: number) {
    this.zona.deleteZona(idZona).subscribe((resp: any) => { this.fetchAllZonas(), console.log(resp), error => (console.log(error)) });
  }

  //Método
  onSubmit() {
    const zona = this.registerForm.value;
    console.log(JSON.stringify(zona));
    this.zona.insertZona(zona).subscribe(resp => { console.log(JSON.stringify(resp), this.fetchAllZonas(), err => console.log(err)), this.isVisible = false });
    this.registerForm.reset()
  }

  //Método
  onSubmitEdit() {
    const zonaEdit = this.editForm.value;
    let id;
    if (this.idEdit != 0) {
      id = this.idEdit;
    }
    this.zona.updateZona(zonaEdit, id).subscribe(resp => {
      console.log(JSON.stringify(resp),
        this.fetchAllZonas(), err => console.log(err)),
        this.isVisibleEdit = false
    });
    this.editForm.reset
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
    this.registerForm.reset();
  }

  //MODAL EDIT
  showModalEdit(): void {
    this.isVisibleEdit = true;
  }

  handleOkEdit(): void {
    console.log('Button ok clicked!');
    this.isVisibleEdit = false;
  }

  handleCancelEdit(): void {
    console.log('Button cancel clicked!');
    this.isVisibleEdit = false;
    this.editForm.reset();
  }


}
