
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/users';
import { DataApiService } from 'src/app/services/data-api.service';
import { ManagedTheatersInterface, ManagedTheaterInterface } from '../../models/managedTheaters';
import { map } from 'rxjs/operators';
import {database} from 'firebase';
import * as _ from 'lodash';
import Fuse from 'fuse.js'

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "Cine",
    "Estado",
    "Ciudad"
  ]
};


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styles: []
})
export class CinemaComponent implements OnInit {
  TheatersCopy: { Cine?: string; Circuito?: string; Ciudad?: string; Direccion?: string; Estado?: string; RtkXrefNo?: number; Salas?: object; key: string; }[];
  cines: any;

  constructor(private authService: AuthService, private dataApi: DataApiService) {}

  @Input() theater: ManagedTheaterInterface;

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };



  // private theaters: TheatersInterface[];
  public managedTheaters: ManagedTheatersInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  pageActual = 1;

  // ---------------------------- Search -------------------------

  searchTerm: string;
  termino: string;

  ngOnInit() {
   // this.getListTheaters();
    // this.getCurrentUser()
    this.getManagedTheatersList();
  }

  search(){
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "Cine",
        "Estado",
        "Ciudad"
      ]
    };
    let fuse = new Fuse(this.TheatersCopy, options); // "list" is the item array
    let result = fuse.search(this.termino);
    this.managedTheaters = result;
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

  // ------------------ Using RealTime database ------------

  getManagedTheatersList() {
    this.dataApi.getManagedTheatersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(managedTheaters => {
      this.managedTheaters = managedTheaters;
      this.TheatersCopy = [...managedTheaters]
      console.log("lists de cines Dentro del subscriber",managedTheaters );
     // this.applyFilters();
    });
  }

  deleteManagedTheater(managedTheatersKey: string) {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteManagedTheater(managedTheatersKey).catch(err => console.log(err));
    }

  }

  onPreUpdateTheater(theater: ManagedTheaterInterface) {
    this.dataApi.selectedManagedTheater = Object.assign({}, theater);
  }




  // ------------------------ Search Value -----------------------
  /// unwrapped arrays from firebase
  /* cinema: any;
  filteredCinema: any;
   /// Active filter rules
   filters = {}

   private applyFilters() {
    this.filteredCinema = _.filter(this.cinema, _.conforms(this.filters) )
  }

    /// filter property by equality to rule
    filterExact(property: string, rule: any) {
      this.filters[property] = val => val == rule
      this.applyFilters()
    }
     /// filter  numbers greater than rule
  filterGreaterThan(property: string, rule: Text) {
    this.filters[property] = val => val > rule
    this.applyFilters()
  }

  /// filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    if (!rule) this.removeFilter(property)
    else {
      this.filters[property] = val => val
      this.applyFilters()
    }
  }

  /// removes filter
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }
  // ------------------ Using CloudFireStore database ------------
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

