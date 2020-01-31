import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface, IncidenciasInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {
  constructor( private dataApi: DataApiService, private authService: AuthService ) { }

  // PDF
  @ViewChild('content', {static: false}) content: ElementRef;

  public incidencias: IncidenciasInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;
  public downloadPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor'(element, renderer) {
        return true;
      }
    };

    const content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers
    });

    doc.save('test.pdf');
  }

  ngOnInit() {
    this.getAllIncidenciasPorAprobar();
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

  // ---------- Using RealTime database -------------------

  getAllIncidenciasPorAprobar() {
    this.dataApi.getAllIncidenciasPorAprobarList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(incidencias => {
      this.incidencias = incidencias;
    });
  }

  deleteIncidenciaPorAprobar(incidenciaKey: string) {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteIncidenciaPorAprobar(incidenciaKey).catch(err => console.log(err));
    }

  }

  onPreUpdateIncidencia(incidencia: IncidenciaInterface) {
    this.dataApi.selectedIncidenciaPorAprobar = Object.assign({}, incidencia);
  }
}



