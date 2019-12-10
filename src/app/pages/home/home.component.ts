import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/users';
import { DataApiService } from "src/app/services/data-api.service";
import { CheckersInterface, CheckerInterface } from "../../models/checkers";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ManagedTheatersInterface } from 'src/app/models/managedTheaters';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  myDate = new Date();
  pageActual = 1;
  constructor( public dataApi: DataApiService, private authService: AuthService ) { }

  public checkers: CheckersInterface[];
  public managedTheaters : ManagedTheatersInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;

  

  ngOnInit() {
    this.getAllCheckers();
    this.getCurrentUser();
    this.getManagedTheatersList();
  
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

  
  //------- Get First elements -------
 
  

  //---------- Using RealTime database -------------------

  getAllCheckers() {
    this.dataApi.getAllCheckersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(checkers => {
      this.checkers = checkers;
      console.log("Checkers Info", this.checkers);
      
    });
  }

  deleteChecker(checkerKey: string){
    console.log("SELECTED", checkerKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteChecker(checkerKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateChecker(checker: CheckerInterface){
    console.log("ON PRE UPGRADE", checker)
    this.dataApi.selectedChecker = Object.assign({}, checker);
  }
  

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

  toArray(asignedTheaters: object) {
    return Object.keys(asignedTheaters).map(key => ({
      key,
      ...asignedTheaters[key]
     
    }))
   
  }


}


  