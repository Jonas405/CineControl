import { Component, OnInit } from '@angular/core';
import { IncidenciaInterface } from 'src/app/models/incidencias';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {


  constructor(private dataApi: DataApiService, private route: ActivatedRoute,
              private db: AngularFireDatabase, private router: Router) { }

    incidence: IncidenciaInterface;

    ngOnInit() {

      this.route.params.subscribe(params => {
        const id = params.id;
        if (id) {
          this.dataApi.getIncidenceById(id).snapshotChanges()
            .subscribe(res => {
              if ((res.payload.exists())) {
                this.incidence = res.payload.toJSON() as IncidenciaInterface;
                this.incidence.key = res.key;
              } else {
              //  this.notificationService.dispatchErrorMessage('Todo does not exist');
                this.router.navigate(['/cinema']);
              }
            }, err => {
              // this.notificationService.dispatchErrorMessage(err.toString());
              // debugger;
            });
        }
      });
    }

  }
