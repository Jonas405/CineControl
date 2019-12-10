import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/users';
import { DataApiService } from "src/app/services/data-api.service";
import { MovieInterface, MoviesInterface} from '../../../models/movies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-walt-disney-studios',
  templateUrl: './walt-disney-studios.component.html',
  styleUrls: ['./walt-disney-studios.component.css']
})
export class WaltDisneyStudiosComponent implements OnInit {
  @Input() title: MovieInterface;

  constructor(private authService: AuthService, private dataApi: DataApiService) {}

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };
  pageActual = 1;
  searchTerm : string;
  
  //private theaters: TheatersInterface[];
  public disneyTitles : MoviesInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  

  ngOnInit() {
   // this.getListTheaters();
    this.getCurrentUser();
    this.getDisneyTitlesList() 

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

  getDisneyTitlesList() {
    this.dataApi.getAllDisneyTitlesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(disneyTitles => {
      this.disneyTitles = disneyTitles;
      console.log("Disney Titles", this.disneyTitles)
    });
  }

  deleteDisneyTitle(disneyTitleKey: string){
    console.log("SELECTED", disneyTitleKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteDisneyTitle(disneyTitleKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateDisneyTitle(disneyTitle: MovieInterface){
    console.log("ON PRE UPGRADE", disneyTitle)
    this.dataApi.selectedDisneyTitle = Object.assign({}, disneyTitle);
  }
 
 
}


