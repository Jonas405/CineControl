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
import { ExportToCsv } from "export-to-csv";

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

  materialesState: Array<any>;
  public materialesDisney: MaterialesDisneyInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;
  pageActual = 1;
  searchTerm: string;
  materiales: Array<any>;
  cines: Array<any>;
  weeks: Array<any>;
  movies: Array<any>;
  circuitos: Array<any>;
  materialsFilter = "Materiales";
  cinesFilter = "Cines";
  weeksFilter = "Semana";
  movieFilter = "Pelicula";
  circuitosFilter = "Circuitos";

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

  exportCsv() {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Reporte CineControl",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };
    const csvExporter = new ExportToCsv(options);

    const materialesCopy = [...this.materialesDisney];
    const filtered = [];

    for (const material of materialesCopy) {
      delete material.key;
      delete material.materialID;
      delete material.checkerID;
    }
    console.log(materialesCopy);
    csvExporter.generateCsv(materialesCopy);
  }

  filterByMaterial(material) {
    this.movieFilter = "Peliculas";
    this.materialsFilter = material;
    this.cinesFilter = "Cines";
    this.weeksFilter = "Semana";
    this.circuitosFilter = "Circuitos";

    const materialesCopy = [...this.materialesState];
    const filtered = [];

    for (let i = 0; i < materialesCopy.length; i++) {
      if (materialesCopy[i].MaterialType == material) {
        filtered.push(materialesCopy[i]);
      }
    }

    this.materialesDisney = filtered;
  }
  filterByCine(cine) {
    this.movieFilter = "Peliculas";
    this.cinesFilter = cine;
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana";
    this.circuitosFilter = "Circuitos";

    const materialesCopy = [...this.materialesState];
    const filtered = [];

    for (let i = 0; i < materialesCopy.length; i++) {
      if (materialesCopy[i].Theater == cine) {
        filtered.push(materialesCopy[i]);
      }
    }

    this.materialesDisney = filtered;
  }
  filterByMovie(movie) {
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana";
    this.movieFilter = movie;
    this.circuitosFilter = "Circuitos";

    const materialesCopy = [...this.materialesState];
    const filtered = [];

    for (let i = 0; i < materialesCopy.length; i++) {
      if (materialesCopy[i].Title == movie) {
        filtered.push(materialesCopy[i]);
      }
    }

    this.materialesDisney = filtered;
  }

  filterByWeek(week) {
    this.movieFilter = "Peliculas";
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana: " + week;
    this.circuitosFilter = "Circuitos";

    const materialesCopy = [...this.materialesState];
    const filtered = [];

    for (let i = 0; i < materialesCopy.length; i++) {
      if (materialesCopy[i].Week == week) {
        filtered.push(materialesCopy[i]);
      }
    }

    this.materialesDisney = filtered;
  }

  filterByCircuito(cto) {
    this.movieFilter = "Peliculas";
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.weeksFilter = "Semana";
    this.circuitosFilter = cto;

    const materialesCopy = [...this.materialesState];
    const filtered = [];

    for (let i = 0; i < materialesCopy.length; i++) {
      if (materialesCopy[i].Circuito == cto) {
        filtered.push(materialesCopy[i]);
      }
    }

    this.materialesDisney = filtered;
  }

  resetFilter() {
    this.movieFilter = "Peliculas";
    this.weeksFilter = "Semana";
    this.cinesFilter = "Cines";
    this.materialsFilter = "Materiales";
    this.circuitosFilter = "Circuitos";
    this.materialesDisney = this.materialesState;
  }

  // ---------- Using RealTime database -------------------

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
        this.materialesState = materialesDisney;
        console.log(this.materialesState);

        // get an array with all the materials
        this.materiales = this.materialesDisney.map(function(item) {
          return item.MaterialType;
        });
        this.materiales = [...new Set(this.materiales)];

        // get an array with all the theathers
        this.cines = this.materialesDisney.map(function(item) {
          return item.Theater;
        });
        this.cines = [...new Set(this.cines)];

        // get an array with all the movies
        this.movies = this.materialesDisney.map(function(item) {
          return item.Title;
        });
        this.movies = [...new Set(this.movies)];

        // get an array with all the weeks
        this.weeks = this.materialesDisney.map(function(item) {
          return item.Week;
        });
        this.weeks = [...new Set(this.weeks)];

        // get an array with all the circuitos
        this.circuitos = this.materialesDisney.map(function(item) {
          return item.Circuito;
        });
        this.circuitos = [...new Set(this.circuitos)];
      });
  }

  deleteMaterialDisney(materialDisneyKey: string) {
    const confirmacion = confirm("Estas seguro?");
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
