import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { MovieInterface } from '../../models/movies';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-walt-disney-title',
  templateUrl: './add-walt-disney-title.component.html',
  styleUrls: ['./add-walt-disney-title.component.css']
})
export class AddWaltDisneyTitleComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveDisneyTitle(disneyTitleForm: NgForm): void {
    if (disneyTitleForm.value.key == null) {
      // New 
      console.log("Create", disneyTitleForm.value);
      this.dataApi.addDisneyTitle(disneyTitleForm.value);
    } else {
      // Update
      console.log("Update", disneyTitleForm.value);
      this.dataApi.updateDisneyTitle(disneyTitleForm.value);
    }
    disneyTitleForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}