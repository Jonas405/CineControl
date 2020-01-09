import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface, IncidenciasInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-incident-approved',
  templateUrl: './incident-approved.component.html',
  styleUrls: ['./incident-approved.component.css']
})
export class IncidentApprovedComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService ) { }

  public incidencias: IncidenciasInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;


  ngOnInit() {
    this.getAllIncidenciasAprobadas();
    // this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
      }
    })
  }

   //---------- Using RealTime database -------------------

   getAllIncidenciasAprobadas() {
    this.dataApi.getAllIncidenciasAprobadasList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(incidencias => {
      this.incidencias = incidencias;
    });
  }

  deleteIncidenciaAprobada(incidenciaKey: string){
    this.dataApi.deleteIncidenciaAprobada(incidenciaKey).catch(err => console.log(err));
  }

  onPreUpdateIncidenciaAprobada(incidencia: IncidenciaInterface){
    this.dataApi.selectedIncidenciaAprobadas = Object.assign({}, incidencia);
  }
}



