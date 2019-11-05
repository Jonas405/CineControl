import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/users';
import { DataApiService } from "src/app/services/data-api.service";
import { TheatersInterface, TheaterInterface } from '../../models/theaters';
import { ManagedTheatersInterface, ManagedTheaterInterface } from '../../models/managedTheaters';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styles: []
})
export class CinemaComponent implements OnInit {

  @Input() theater: ManagedTheaterInterface;

  constructor(private authService: AuthService, private dataApi: DataApiService) {}

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  
  //private theaters: TheatersInterface[];
  private managedTheaters : ManagedTheatersInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  pageActual = 1;

  ngOnInit() {
   // this.getListTheaters();
    this.getCurrentUser();
    this.getManagedTheatersList() 

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

  //------------------ Using RealTime database ------------

  getManagedTheatersList() {
    this.dataApi.getManagedTheatersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(managedTheaters => {
      this.managedTheaters = managedTheaters;
      console.log("ManagedTheaters", this.managedTheaters)
    });
  }

  deleteManagedTheater(managedTheatersKey: string){
    console.log("SELECTED", managedTheatersKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteManagedTheater(managedTheatersKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateTheater(theater: ManagedTheaterInterface){
    console.log("ON PRE UPGRADE", theater)
    this.dataApi.selectedManagedTheater = Object.assign({}, theater);
  }

 

  //------------------ Using CloudFireStore database ------------
  /* 

  getListTheaters() {
    this.dataApi.getAllTheaters()
      .subscribe(theaters => {
        this.theaters = theaters;
        console.log("COMPONENT", theaters);
      });
  }

  onDeleteTheater(idTheater: string): void {
    const confirmacion = confirm('Are you sure?');
    console.log("DELETE", idTheater);
    if (confirmacion) {
      this.dataApi.deleteTheater(idTheater);
    }
  }

  onPreUpdateTheater(theater: TheaterInterface) {
    this.dataApi.selectedTheater = Object.assign({}, theater);
  } */

}

