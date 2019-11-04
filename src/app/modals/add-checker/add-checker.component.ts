import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CheckerInterface } from '../../models/checkers';
import { NgForm } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-checker',
  templateUrl: './add-checker.component.html',
  styleUrls: ['./add-checker.component.css']
})
export class AddCheckerComponent implements OnInit {


  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }


  

  onSaveChecker(checkerForm: NgForm): void {
    if (checkerForm.value.key == null) {
      // New 
      let uniqueId = uuid();
      console.log("UNIQUE ID", uniqueId);
      checkerForm.value.userID = uniqueId;
      console.log("ADD IND", checkerForm.value);
      this.dataApi.addChecker(checkerForm.value);
    } else {
      // Update
      this.dataApi.updateChecker(checkerForm.value);
    }
    checkerForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
