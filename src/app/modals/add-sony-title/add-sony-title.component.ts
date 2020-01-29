import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { MovieInterface } from '../../models/movies';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';



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
//   private uploadTask: firebase.storage.UploadTask;
/*
   selectToday() {
    this.model = this.calendar.getToday();
  }
 */

   onSaveSonyTitle(sonyTitleForm: NgForm): void {
    if (sonyTitleForm.value.key == null) {
      // New
      sonyTitleForm.value.studio = 'Sony Pictures Releasing'
      let storageRef = firebase.storage().ref('SonyTitles/' + this.selectedImage.name);
 //     this.uploadTask = storageRef.put(this.selectedImage);
// Firebase doc Test


      var uploadTask = storageRef.child('SonyTitles/' + this.selectedImage.name).put(this.selectedImage);
   
          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              const imageUrl = downloadURL;
              console.log("This is the URL", imageUrl);
              sonyTitleForm.value.imageURL = imageUrl;
            });
          });

    /*   this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
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
        }) */
        
          //Upload file
    /*     this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const imageUrl = downloadURL;
          console.log("This is the URL", imageUrl);
          sonyTitleForm.value.imageURL = imageUrl;
          
        }); */

        const a = this.model2.toLocaleString();
        sonyTitleForm.value.releaseDate = a;
        console.log("Before to go the function upload", sonyTitleForm.value);
        this.sonyTitleSaveData(sonyTitleForm);


    } else {
      // Update
      this.dataApi.updateSonyTitle(sonyTitleForm.value);
      console.log(sonyTitleForm.value);
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

   public sonyTitleSaveData (sonyTitleForm){
     console.log("Final information to upload", sonyTitleForm.value);
    this.dataApi.addSonyTitle(sonyTitleForm.value);
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

