import { Component, OnInit } from '@angular/core';
import { InfozonaService } from 'src/app/Services/infozona.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Empleado } from 'src/app/Domain/Empleado';

@Component({
  selector: 'app-infozona',
  templateUrl: './infozona.component.html',
  styleUrls: ['./infozona.component.css']
})
export class InfozonaComponent implements OnInit {
  searchValue = '';
  visible = false;
  loading = true;
  listOfData = [];
  listOfDisplayData = []
  //total de hogares y zona
  total: number = 0;

  currentEmpleado: Empleado;
  constructor(private infozona: InfozonaService, private authEmpleado: AuthenticationService) {
    this.currentEmpleado = this.authEmpleado.currentEmpleadoValue;
  }

  ngOnInit(): void {
    this.fetchAllZonas();
  }
  fetchAllZonas() {
    let zona = this.authEmpleado.currentEmpleadoValue != null ? parseInt(this.authEmpleado.currentEmpleadoValue.data.censoZona.zona.idZona) : 0;
    let censo = this.authEmpleado.currentEmpleadoValue != null ? parseInt(this.authEmpleado.currentEmpleadoValue.data.censoZona.censo.idCenso) : 0;
    //let zona = this.authEmpleado.currentEmpleadoValue != null ? 3 : 0;
    //let censo = this.authEmpleado.currentEmpleadoValue != null ? 18 : 0;

    if (zona != 0 && censo != 0) {
      this.infozona.getAllInfoZona(censo, zona).subscribe((resp: any) => {
        this.listOfData = resp.data, this.listOfDisplayData = [...this.listOfData], this.loading = false, resp.data.forEach((x) => {
          this.total = this.total + 1;
        })
      }, error => { (console.log(error)), this.loading = false });
    }

  }

  //DATATABLES
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: any) => item.nombres.indexOf(this.searchValue) !== -1);
  }





}
