import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { MovieInterface } from '../../models/movies';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-add-sony-title',
  templateUrl: './add-sony-title.component.html',
  styleUrls: ['./add-sony-title.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AddSonyTitleComponent implements OnInit {

  model2: Date;
  get today() {
    return new Date();
  }
  constructor(public dataApi: DataApiService, public calendar: NgbCalendar) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;


  ngOnInit() {
  }

   //Add URL Storage

   private uploadTask: firebase.storage.UploadTask;
/*
   selectToday() {
    this.model = this.calendar.getToday();
  }
 */
   onSaveSonyTitle(sonyTitleForm: NgForm): void {
    if (sonyTitleForm.value.key == null) {
      // New

      let uniqueId = uuid();
      let storageRef = firebase.storage().ref('SonyTitles/' + this.selectedImage.name);
      this.uploadTask = storageRef.put(this.selectedImage);
      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
        //  movie.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log(error)
        },
        () => {
        //  movie.imageURL = this.uploadTask.snapshot.downloadURL;
          //console.log("file url", movie.file)
          //console.log("StorageReference", storageRef);
        })
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const imageUrl = downloadURL;
          sonyTitleForm.value.imageURL = imageUrl;
        });

        const a = this.model2.toLocaleString();

        sonyTitleForm.value.releaseDate = a;
        this.dataApi.addSonyTitle(sonyTitleForm.value);

    } else {
      // Update
      this.dataApi.updateSonyTitle(sonyTitleForm.value);
    }
    sonyTitleForm.resetForm();
    this.btnClose.nativeElement.click();
  }

  ////// Method for check image
  imgSrc: string;
  selectedImage: File = null;
  isSubmitted: boolean;

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

 }

/*
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.service.insertImageDetails(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  } */

