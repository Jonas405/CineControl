import { Component, OnInit, ViewChild } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/users';
import { map } from 'rxjs/operators';
import { MaterialesSonyInterface, MaterialSonyInterface } from 'src/app/models/materialesSony';
import { NgbCarousel,NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sony-materiales',
  templateUrl: './sony-materiales.component.html',
  styleUrls: ['./sony-materiales.component.css']
})
export class SonyMaterialesComponent implements OnInit {
 
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  pageActual = 1;
  searchTerm : string;

  constructor( private dataApi: DataApiService, private authService: AuthService,
    config: NgbCarouselConfig ) { 
      config.interval = 5000;
      config.wrap = true;
      config.keyboard = true;
      config.pauseOnHover = true;
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true; 
      

    }

  public materialesSony: MaterialesSonyInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;

  ngOnInit() {
    this.getAllMaterialesSony();
    this.getCurrentUser();
    //this.slides = this.chunk(this.getAllMaterialesSony, 3);
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

  getAllMaterialesSony() {
    this.dataApi.getAllMaterialesSonyList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(materialesSony => {
      this.materialesSony = materialesSony;
      console.log("materialesSony", this.materialesSony);
    });
  }

  deleteMaterialSony(materialSonyKey: string){
    console.log("SELECTED", materialSonyKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteMaterialSony(materialSonyKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateMaterialSony(materialSony: MaterialSonyInterface){
    console.log("ON PRE UPGRADE", materialSony)
    this.dataApi.selectedSonyMaterial = Object.assign({}, materialSony);
  }

  
}

