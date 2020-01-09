import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CommentsInterface } from '../../models/comments';
import { NgForm } from '@angular/forms';
import { Upload } from 'src/app/models/Upload';
import { v4 as uuid } from 'uuid';
import * as firebase from 'firebase';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AddCommentsComponent implements OnInit {


  model3: Date;
  get today() {
    return new Date();
  }

  constructor(public dataApi: DataApiService, public calendar: NgbCalendar) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

     //upload file

     private uploadTask: firebase.storage.UploadTask;
     fileToUpload: File = null;

  onSaveComment(commentForm: NgForm): void {
    if (commentForm.value.key == null) {
      //
      let uniqueId = uuid();
      commentForm.value.logisticID = uniqueId;
      let storageRef = firebase.storage().ref('Logistica/' + this.fileToUpload.name);
     // this.uploadTask = storageRef.child(`${this.basePath}/${uniqueId}`).put(this.fileToUpload);
      this.uploadTask = storageRef.put(this.fileToUpload);
      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
     //   upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log(error)
        },
        () => {

       //   this.saveFileData(upload)
        })

        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const imageUrl = downloadURL;
         // comment.url = imageUrl

        commentForm.value.logisticID = uniqueId;
        commentForm.value.url = imageUrl;

        });


        const b = this.model3.toLocaleString();
        commentForm.value.timeStamp = b;
        this.dataApi.addComments(commentForm.value);

      //
      // New
    //  let logisticReference = DatabaseService.shared.logisticRef.childByAutoId()
     // let childAutoID = logisticReference.key;

    } else {
      // Update
      this.dataApi.updateComment(commentForm.value);
    }
    commentForm.resetForm();
    this.btnClose.nativeElement.click();
  }

   //Upload a file

   handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
}
