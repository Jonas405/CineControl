import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.css']
})
export class AddIncidenciaComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveIncidencia(incidenciaForm: NgForm): void {
    if (incidenciaForm.value.key == null) {
      // New 
      console.log("incidencia New", incidenciaForm);
      this.dataApi.addIncidencia(incidenciaForm.value);
    } else {
      // Update
      console.log("incidencia Update", incidenciaForm);
      this.dataApi.updateIncidenciaPorAprobar(incidenciaForm.value); 
      this.dataApi.addIncidenciaAprobada(incidenciaForm.value);
      this.dataApi.deleteIncidenciaPorAprobar(incidenciaForm.value.incidenciaKey).catch(err => console.log(err));
    }
    incidenciaForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
