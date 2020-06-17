import { Component, OnInit } from '@angular/core';
import { CensoService } from 'src/app/Services/censo.service';
import { Censo } from 'src/app/Domain/Censo';

@Component({
  selector: 'app-censo',
  templateUrl: './censo.component.html',
  styleUrls: ['./censo.component.css']
})
export class CensoComponent implements OnInit {
  ///DATATABLE
  searchValue = '';
  visible = false;
  loading = true;
  listOfData = [];
  listOfDisplayData = [];
  constructor(private censo: CensoService) { }

  ngOnInit(): void {
    this.fetchAllCenso();
  }

  editZona(idCenso: number) { }
  deleteZona(idCenso: number) { }

  //FETCHS....
  fetchAllCenso() {
    this.censo.getAllCenso().subscribe((resp: any) => { this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false }, error => (console.log(error)));
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
}
