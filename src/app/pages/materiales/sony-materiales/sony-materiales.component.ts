import { Component, OnInit, ViewChild } from "@angular/core";
import { DataApiService } from "../../../services/data-api.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserInterface } from "../../../models/users";
import { map } from "rxjs/operators";
import {
  MaterialesSonyInterface,
  MaterialSonyInterface
} from "src/app/models/materialesSony";
import { NgbCarousel, NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-sony-materiales",
  templateUrl: "./sony-materiales.component.html",
  styleUrls: ["./sony-materiales.component.css"]
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
  searchTerm: string;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    config: NgbCarouselConfig
  ) {
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
  materiales: Array<any>;
  cines: Array<any>;
  weeks: Array<any>;
  materialsFilter = "Materiales";
  cinesFilter = "Cines";
  weeksFilter = "Semana";

  ngOnInit() {
    this.getAllMaterialesSony();
    // this.getCurrentUser();
    //this.slides = this.chunk(this.getAllMaterialesSony, 3);
  }

  filterByMaterial(material) {
    this.materialsFilter = material;
    this.cinesFilter = "Cines";
    this.weeksFilter = "Semana";
    this.dataApi
      .getAllMaterialesSonyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesSony => {
        let filtered = [];
        for (let i = 0; i < materialesSony.length; i++) {
          if (materialesSony[i].MaterialType == material) {
            filtered.push(materialesSony[i]);
          }
        }

        this.materialesSony = filtered;
      });
  }

  filterByCine(cine) {
    this.cinesFilter = cine;
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana";

    this.dataApi
      .getAllMaterialesSonyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesSony => {
        let filtered = [];
        for (let i = 0; i < materialesSony.length; i++) {
          if (materialesSony[i].Theater == cine) {
            filtered.push(materialesSony[i]);
          }
        }

        this.materialesSony = filtered;
      });
  }
  filterByWeek(week) {
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana: " + week;

    this.dataApi
      .getAllMaterialesSonyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesSony => {
        let filtered = [];
        for (let i = 0; i < materialesSony.length; i++) {
          if (materialesSony[i].Week == week) {
            filtered.push(materialesSony[i]);
          }
        }

        this.materialesSony = filtered;
      });
  }

  resetFilter() {
    this.materialsFilter = "Materiales";
    this.cinesFilter = "Cines";
    this.weeksFilter = "Semana";
    this.getAllMaterialesSony();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
      }
    });
  }

  //---------- Using RealTime database -------------------

  getAllMaterialesSony() {
    this.dataApi
      .getAllMaterialesSonyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesSony => {
        this.materialesSony = materialesSony;

        //get an array with all the materials
        this.materiales = this.materialesSony.map(function(item) {
          return item["MaterialType"];
        });
        this.materiales = [...new Set(this.materiales)];

        //get an array with all the theathers
        this.cines = this.materialesSony.map(function(item) {
          return item["Theater"];
        });
        this.cines = [...new Set(this.cines)];

        //get an array with all the weeks
        this.weeks = this.materialesSony.map(function(item) {
          return item["Week"];
        });
        this.weeks = [...new Set(this.weeks)];
      });
  }

  deleteMaterialSony(materialSonyKey: string) {
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi
        .deleteMaterialSony(materialSonyKey)
        .catch(err => console.log(err));
    }
  }

  onPreUpdateMaterialSony(materialSony: MaterialSonyInterface) {
    this.dataApi.selectedSonyMaterial = Object.assign({}, materialSony);
  }
}
