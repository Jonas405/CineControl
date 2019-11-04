import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { MovieInterface } from 'src/app/models/movies';

@Component({
  selector: 'app-walt-disney-studios-detail',
  templateUrl: './walt-disney-studios-detail.component.html',
  styleUrls: ['./walt-disney-studios-detail.component.css']
})
export class WaltDisneyStudiosDetailComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute,
    private db: AngularFireDatabase, private router: Router) { }
    movie : MovieInterface;

    ngOnInit() {
  
      this.route.params.subscribe(params => {
        const id = params.id;
        console.log("ID movie", id);
        if (id) {
          this.dataApi.getDisneyTitleByID(id).snapshotChanges()
            .subscribe(res => {
              if ((res.payload.exists())) {
                this.movie = res.payload.toJSON() as MovieInterface;
                this.movie.key = res.key;
                console.log("Movie Res", this.movie);
              } else {
              //  this.notificationService.dispatchErrorMessage('Todo does not exist');
                this.router.navigate(['/home']);
              }
            }, err => {
              //this.notificationService.dispatchErrorMessage(err.toString());
              //debugger;
            });
        }
      });
    }
  
  }
  