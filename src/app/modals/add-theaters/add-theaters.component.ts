import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { TheaterInterface } from '../../models/theaters';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-theaters',
  templateUrl: './add-theaters.component.html',
  styleUrls: ['./add-theaters.component.css']
})
export class AddTheatersComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveTheater(theaterForm: NgForm): void {
    if (theaterForm.value.key == null) {
      // New 
      this.dataApi.addManagedTheaters(theaterForm.value);
    } else {
      // Update
      this.dataApi.updateManagedTheater(theaterForm.value);
    }
    theaterForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}




