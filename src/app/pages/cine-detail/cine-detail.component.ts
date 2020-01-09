import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { TheaterInterface } from 'src/app/models/theaters';

@Component({
  selector: 'app-cine-detail',
  templateUrl: './cine-detail.component.html',
  styleUrls:['./cine-detail.component.css']
})
export class CineDetailComponent implements OnInit {

  title = 'Cine Location';
  lat = 19.3581748;
  lng = -99.3861982;

  pageActual = 1;

  constructor(private dataApi: DataApiService, private route: ActivatedRoute,
    private db: AngularFireDatabase, private router: Router) { }

  theater: TheaterInterface;

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.dataApi.getTheaterById(id).snapshotChanges()
          .subscribe(res => {
            if ((res.payload.exists())) {
              this.theater = res.payload.toJSON() as TheaterInterface;
              this.theater.key = res.key;
            } else {
            //  this.notificationService.dispatchErrorMessage('Todo does not exist');
              this.router.navigate(['/cinema']);
            }
          }, err => {
            //this.notificationService.dispatchErrorMessage(err.toString());
            //debugger;
          });
      }
    });
  }

  toArray(asignedTheaters: object) {
    return Object.keys(asignedTheaters).map(key => ({
      key,
      ...asignedTheaters[key]

    }))

  }

}
