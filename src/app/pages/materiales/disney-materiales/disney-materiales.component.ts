import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/users';
import { map } from 'rxjs/operators';
import { MaterialDisneyInterface, MaterialesDisneyInterface } from 'src/app/models/materialesDisney';


@Component({
  selector: 'app-disney-materiales',
  templateUrl: './disney-materiales.component.html',
  styleUrls: ['./disney-materiales.component.css']
})
export class DisneyMaterialesComponent implements OnInit {


  constructor( private dataApi: DataApiService, private authService: AuthService ) { }

  public materialesDisney: MaterialesDisneyInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;
  searchTerm : string; 
  ngOnInit() {
    this.getAllMaterialesDisney();
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

  getAllMaterialesDisney() {
    this.dataApi.getAllMaterialesDisneyList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(materialesDisney => {
      this.materialesDisney = materialesDisney;
      console.log("materialesDisney", this.materialesDisney);
    });
  }

  deleteMaterialDisney(materialDisneyKey: string){
    console.log("SELECTED", materialDisneyKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteMaterialDisney(materialDisneyKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateMaterialDisney(materialDisney: MaterialDisneyInterface){
    console.log("ON PRE UPGRADE", materialDisney)
    this.dataApi.selectedChecker = Object.assign({}, materialDisney);
  }
}
