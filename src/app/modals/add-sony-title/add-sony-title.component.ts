import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { MovieInterface } from '../../models/movies';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-sony-title',
  templateUrl: './add-sony-title.component.html',
  styleUrls: ['./add-sony-title.component.css']
})
export class AddSonyTitleComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveSonyTitle(sonyTitleForm: NgForm): void {
    if (sonyTitleForm.value.key == null) {
      // New 
      console.log("Create", sonyTitleForm.value);
      this.dataApi.addSonyTitle(sonyTitleForm.value);
    } else {
      // Update
      console.log("Update", sonyTitleForm.value);
      this.dataApi.updateSonyTitle(sonyTitleForm.value);
    }
    sonyTitleForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}