import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CheckerInterface } from '../../models/checkers';
import { NgForm } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ManagedTheaterInterface, ManagedTheatersInterface } from 'src/app/models/managedTheaters';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asig-theater-checker',
  templateUrl: './asig-theater-checker.component.html',
  styleUrls: ['./asig-theater-checker.component.css']
})
export class AsigTheaterCheckerComponent implements OnInit {

  constructor(public dataApi: DataApiService, private db: AngularFireDatabase,
              private route: ActivatedRoute, private router: Router) {

   }


  // Asignar cine a checker
  idChecker;
  manager: ManagedTheaterInterface;


  assigTheaterCheckerRef: AngularFireList<ManagedTheaterInterface> = null;
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;

  private dbPathAssigTheaterChecker = '/USER/' + this.idChecker + '/asignedTheaters';
  // @Input() userUid: string;

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params.id;
      this.idChecker = id;
      this.dbPathAssigTheaterChecker = '/USER/' + this.idChecker + '/asignedTheaters';
      if (id) {
        this.dataApi.getAssigTheaterChecker(id).snapshotChanges()
          .subscribe(res => {
            if ((res.payload.exists())) {
              this.manager = res.payload.toJSON() as CheckerInterface;
              this.manager.key = res.key;
              return this.idChecker;
            } else {
            //  this.notificationService.dispatchErrorMessage('Todo does not exist');
              this.router.navigate(['/cinema']);
            }
          }, err => {
            // this.notificationService.dispatchErrorMessage(err.toString());
            // debugger;
          });
      }
    });
  }

  onSaveNewTheater(asingTheaterForm: NgForm): void {
    if (asingTheaterForm.value.key == null) {
      // New

      this.assigTheaterCheckerRef = this.db.list(this.dbPathAssigTheaterChecker);
      this.assigTheaterCheckerRef.push(asingTheaterForm.value);
    } else {
      // Update
      const keyAssig = this.manager.key;

    //  this.assigTheaterCheckerRef = this.db.list(this.dbPathAssigTheaterChecker);
      this.assigTheaterCheckerRef.update(keyAssig, asingTheaterForm.value);
    }
    asingTheaterForm.resetForm();
    this.btnClose.nativeElement.click();
  }


/*

   // Add Cine list
  public managedTheatersInsi : ManagedTheatersInterface[];
    //add Search list
    searchTerm : string;
    pageActual = 1;

  getManagedTheatersList() {
    this.dataApi.getManagedTheatersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(managedTheaters => {
      this.managedTheatersInsi = managedTheaters;
      console.log("ManagedTheaters Inside Assig", this.managedTheatersInsi)
    });
  } */

}
