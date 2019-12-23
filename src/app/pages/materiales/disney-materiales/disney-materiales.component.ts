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
  materiales: Array<Object>;
  cines: Array<Object>;

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
    });
  }

  resetFilter() {
    this.getAllMaterialesDisney();
  }

  filterByMaterial(material) {
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
      });
  }

  deleteMaterialDisney(materialDisneyKey: string) {
    console.log("SELECTED", materialDisneyKey);
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi
        .deleteMaterialDisney(materialDisneyKey)
        .catch(err => console.log(err));
    }
  }

  onPreUpdateMaterialDisney(materialDisney: MaterialDisneyInterface) {
    console.log("ON PRE UPGRADE", materialDisney);
    this.dataApi.selectedChecker = Object.assign({}, materialDisney);
  }
}