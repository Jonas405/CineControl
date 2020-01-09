import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-incidencia-disney',
  templateUrl: './add-incidencia-disney.component.html',
  styleUrls: ['./add-incidencia-disney.component.css']
})
export class AddIncidenciaDisneyComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveIncidencia(incidenciaForm: NgForm): void {
    if (incidenciaForm.value.key == null) {
      // New
      this.dataApi.addIncidenciaDisney(incidenciaForm.value);
    } else {
      // Update
      incidenciaForm.value.Aprovacion = "true";
      this.dataApi.updateIncidenciaPorAprobarDisney(incidenciaForm.value);
      this.dataApi.addIncidenciaAprobadaDisney(incidenciaForm.value);
      this.dataApi.deleteIncidenciaPorAprobarDisney(incidenciaForm.value.incidenciaKey).catch(err => console.log(err));
    }
    incidenciaForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
