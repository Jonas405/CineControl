import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import {
  IncidenciaInterface,
  IncidenciasInterface
} from '../../models/incidencias';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-incident-approved-sony',
  templateUrl: './incident-approved-sony.component.html',
  styleUrls: ['./incident-approved-sony.component.css']
})
export class IncidentApprovedSonyComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private authService: AuthService
  ) {}

  public incidencias: IncidenciasInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;

  ngOnInit() {
    this.getAllIncidenciasAprobadasSony();
    // this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
      }
    });
  }

  exportCsv() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Reporte CineControl',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };
    const csvExporter = new ExportToCsv(options);

    const incidenciasCopy = [...this.incidencias];
    const filtered = [];

    for (const item of incidenciasCopy) {
      delete item.key;
      delete item.Aprovacion;
      delete item.Checker;
      delete item.postID;
    }
    console.log(incidenciasCopy);
    csvExporter.generateCsv(incidenciasCopy);
  }
  // ---------- Using RealTime database -------------------

  getAllIncidenciasAprobadasSony() {
    this.dataApi
      .getAllIncidenciasAprobadasListSony()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(incidencias => {
        this.incidencias = incidencias;
      });
  }

  deleteIncidenciaAprobadaSony(incidenciaKey: string) {
    this.dataApi
      .deleteIncidenciaAprobadaSony(incidenciaKey)
      .catch(err => console.log(err));
  }

  onPreUpdateIncidenciaAprobadaSony(incidencia: IncidenciaInterface) {
    this.dataApi.selectedIncidenciaAprobadasSony = Object.assign(
      {},
      incidencia
    );
  }
}
