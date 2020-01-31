import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/users';
import { DataApiService } from 'src/app/services/data-api.service';
import { MovieInterface, MoviesInterface} from '../../../models/movies';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sony-pictures-releasing',
  templateUrl: './sony-pictures-releasing.component.html',
  styleUrls: ['./sony-pictures-releasing.component.css']
})
export class SonyPicturesReleasingComponent implements OnInit {
  @Input() title: MovieInterface;
  pageActual = 1;

  constructor(private authService: AuthService, private dataApi: DataApiService) {}

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  // private theaters: TheatersInterface[];
  public sonyTitles: MoviesInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  searchTerm: string;

  ngOnInit() {
   // this.getListTheaters();
    // this.getCurrentUser();
    this.getSonyTitlesList();

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

  getSonyTitlesList() {
    this.dataApi.getAllSonyTitlesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(sonyTitles => {
      this.sonyTitles = sonyTitles;
    });
  }

  deleteSonyTitle(sonyTitleKey: string) {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteSonyTitle(sonyTitleKey).catch(err => console.log(err));
    }

  }

  onPreUpdateSonyTitle(sonyTitle: MovieInterface) {
    this.dataApi.selectedSonyTitle = Object.assign({}, sonyTitle);
  }


}


