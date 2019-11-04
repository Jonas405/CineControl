import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface, IncidenciasInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {
  constructor( private dataApi: DataApiService, private authService: AuthService ) { }

  private incidencias: IncidenciasInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;

  ngOnInit() {
    this.getAllIncidenciasPorAprobar();
    this.getCurrentUser();
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

  getAllIncidenciasPorAprobar() {
    this.dataApi.getAllIncidenciasPorAprobarList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(incidencias => {
      this.incidencias = incidencias;
      console.log("Incidencias", this.incidencias);
    });
  }

  deleteIncidenciaPorAprobar(incidenciaKey: string){
    console.log("SELECTED", incidenciaKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteIncidenciaPorAprobar(incidenciaKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateIncidencia(incidencia: IncidenciaInterface){
    console.log("ON PRE UPGRADE", incidencia)
    this.dataApi.selectedIncidenciaPorAprobar = Object.assign({}, incidencia);
  }
}



