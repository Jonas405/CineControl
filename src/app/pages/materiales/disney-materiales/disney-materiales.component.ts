import { Component, OnInit } from "@angular/core";
import { DataApiService } from "../../../services/data-api.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserInterface } from "../../../models/users";
import { map } from "rxjs/operators";
import {
  MaterialDisneyInterface,
  MaterialesDisneyInterface
} from "src/app/models/materialesDisney";

@Component({
  selector: "app-disney-materiales",
  templateUrl: "./disney-materiales.component.html",
  styleUrls: ["./disney-materiales.component.css"]
})
export class DisneyMaterialesComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private authService: AuthService
  ) {}

  public materialesDisney: MaterialesDisneyInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;
  searchTerm: string;
  materiales: Array<any>;
  cines: Array<any>;
  weeks: Array<any>;
  materialsFilter = "Materiales";
  cinesFilter = "Cines";
  weeksFilter = "Semana";

  ngOnInit() {
    this.getAllMaterialesDisney();
    // this.getCurrentUser();
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
      .subscribe(materialesDisney => {
        let filtered = [];
        for (let i = 0; i < materialesDisney.length; i++) {
          if (materialesDisney[i].MaterialType == material) {
            filtered.push(materialesDisney[i]);
          }
        }

        this.materialesDisney = filtered;
      });
  }
  filterByCine(cine) {
    this.cinesFilter = cine;
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana";
    this.dataApi
      .getAllMaterialesDisneyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesDisney => {
        let filtered = [];
        for (let i = 0; i < materialesDisney.length; i++) {
          if (materialesDisney[i].Theater == cine) {
            filtered.push(materialesDisney[i]);
          }
        }

        this.materialesDisney = filtered;
      });
  }

  filterByWeek(week) {
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana: " + week;

    this.dataApi
      .getAllMaterialesDisneyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesDisney => {
        let filtered = [];
        for (let i = 0; i < materialesDisney.length; i++) {
          if (materialesDisney[i].Week == week) {
            filtered.push(materialesDisney[i]);
          }
        }

        this.materialesDisney = filtered;
      });
  }

  resetFilter() {
    this.weeksFilter = "Semana";
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.getAllMaterialesDisney();
  }

  //---------- Using RealTime database -------------------

  getAllMaterialesDisney() {
    this.dataApi
      .getAllMaterialesDisneyList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesDisney => {
        this.materialesDisney = materialesDisney;

        //get an array with all the materials
        this.materiales = this.materialesDisney.map(function(item) {
          return item["MaterialType"];
        });
        this.materiales = [...new Set(this.materiales)];

        //get an array with all the theathers
        this.cines = this.materialesDisney.map(function(item) {
          return item["Theater"];
        });
        this.cines = [...new Set(this.cines)];

        //get an array with all the weeks
        this.weeks = this.materialesDisney.map(function(item) {
          return item["Week"];
        });
        this.weeks = [...new Set(this.weeks)];
      });
  }

  deleteMaterialDisney(materialDisneyKey: string) {
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi
        .deleteMaterialDisney(materialDisneyKey)
        .catch(err => console.log(err));
    }
  }

  onPreUpdateMaterialDisney(materialDisney: MaterialDisneyInterface) {
    this.dataApi.selectedChecker = Object.assign({}, materialDisney);
  }
}
