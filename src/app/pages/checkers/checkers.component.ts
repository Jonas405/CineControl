import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CheckerInterface, CheckersInterface } from '../../models/checkers';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-checkers',
  templateUrl: './checkers.component.html',
  styles: ['./checkers.component.css']
})
export class CheckersComponent implements OnInit {

  constructor( private dataApi: DataApiService, private authService: AuthService ) { }

  public checkers: CheckersInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;

  ngOnInit() {
    this.getAllCheckers();
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

  getAllCheckers() {
    this.dataApi.getAllCheckersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(checkers => {
      this.checkers = checkers;
      console.log("ManagedTheaters", this.checkers);
    });
  }

  deleteChecker(checkerKey: string){
    console.log("SELECTED", checkerKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteChecker(checkerKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateChecker(checker: CheckerInterface){
    console.log("ON PRE UPGRADE", checker)
    this.dataApi.selectedChecker = Object.assign({}, checker);
  }

  searchTerm : string;


  
 //------------------ Using CloudFireStore database ------------
/* 
  getListChecker() {
    this.dataApi.getAllCheckers()
      .subscribe(checkers => {
        this.checkers = checkers;
      });
  }

  onDeleteChecker(idChecker: string): void {
    console.log("Checker id", idChecker);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteChecker(idChecker);
    }
  }

  onPreUpdateChecker(checker: CheckerInterface) {
    console.log('Checker', this.checkers);
    this.dataApi.selectedChecker = Object.assign({}, checker);
  } */

}

