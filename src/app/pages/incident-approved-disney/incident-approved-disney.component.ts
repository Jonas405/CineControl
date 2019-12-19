import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { IncidenciaInterface, IncidenciasInterface } from '../../models/incidencias';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-incident-approved-disney',
  templateUrl: './incident-approved-disney.component.html',
  styleUrls: ['./incident-approved-disney.component.css']
})
export class IncidentApprovedDisneyComponent implements OnInit {


  constructor(private dataApi: DataApiService, private authService: AuthService ) { }

  public incidencias: IncidenciasInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;

  
  ngOnInit() {
    this.getAllIncidenciasAprobadasDisney();
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

   getAllIncidenciasAprobadasDisney() {
    this.dataApi.getAllIncidenciasAprobadasListDisney().snapshotChanges().pipe(
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

  deleteIncidenciaAprobadaDisney(incidenciaKey: string){
    console.log("SELECTED", incidenciaKey);

      this.dataApi.deleteIncidenciaAprobadaDisney(incidenciaKey).catch(err => console.log(err));
    
  
  }

  onPreUpdateIncidenciaAprobadaDisney(incidencia: IncidenciaInterface){
    console.log("ON PRE UPGRADE", incidencia)
    this.dataApi.selectedIncidenciaAprobadasDisney = Object.assign({}, incidencia);
  }


}



