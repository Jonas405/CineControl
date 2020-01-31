import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService,
               private dataApi: DataApiService,
               private afsAuth: AngularFireAuth,
               public _sidebar: SidebarService) { }

  public checkers = [];
  public checker = '';

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  public providerId = 'null';
  ngOnInit() {

    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });

  }

  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
