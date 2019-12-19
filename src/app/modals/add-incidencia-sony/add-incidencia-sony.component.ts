import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-incidencia-sony',
  templateUrl: './add-incidencia-sony.component.html',
  styleUrls: ['./add-incidencia-sony.component.css']
})
export class AddIncidenciaSonyComponent implements OnInit {

 
  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveIncidencia(incidenciaForm: NgForm): void {
    if (incidenciaForm.value.key == null) {
      // New 
      console.log("incidencia New", incidenciaForm);
      this.dataApi.addIncidenciaSony(incidenciaForm.value);
    } else {
      // Update
      console.log("incidencia Update", incidenciaForm);
      this.dataApi.updateIncidenciaPorAprobarSony(incidenciaForm.value); 
      this.dataApi.addIncidenciaAprobadaSony(incidenciaForm.value);
      this.dataApi.deleteIncidenciaPorAprobarSony(incidenciaForm.value.incidenciaKey).catch(err => console.log(err));
    }
    incidenciaForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
