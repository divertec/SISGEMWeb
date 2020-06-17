import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/Domain/Zona';
import { ZonaService } from 'src/app/Services/zona.service';

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
  constructor(private zona: ZonaService) { }

  ngOnInit(): void {
    this.fetchAllZonas();
  }

  editZona(idZona: number) { }
  deleteZona(idZona: number) { }

  //FETCHS....
  fetchAllZonas() {
    this.zona.getAllEmpleados().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
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


}
