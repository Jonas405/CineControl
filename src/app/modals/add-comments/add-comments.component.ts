import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CommentsInterface } from '../../models/comments';
import { NgForm } from '@angular/forms';
import { Upload } from 'src/app/models/Upload';
import { v4 as uuid } from 'uuid';
import * as firebase from 'firebase';
import {
  AngularFireUploadTask,
  AngularFireStorage
} from '@angular/fire/storage';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddCommentsComponent implements OnInit {
  model3: Date;
  message: string;
  titulo: string;
  fecha: any;
  url: any;
  data: any;
  uploaded = false;
  loading = false;

  get today() {
    return new Date();
  }

  constructor(
    public dataApi: DataApiService,
    public calendar: NgbCalendar,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: string;

  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    this.loading = true;
    // The File object
    const file = event.item(0);

    // AQUI ES EL PATH DE DONDE SE SUBE LA IMAGEN
    // The storage path
    const path = `logistica/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file).then(() => {
      // Promise just if is upload the file take a ref
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.url = url; // with this you can use it in the html
        console.log('this is the url q tal', this.url);
        this.uploaded = true;
        this.loading = false;
      });
    });

    // Progress monitoring
    // this.percentage = this.task.percentageChanges();
    // this.snapshot = this.task.snapshotChanges();

    // The file's download URL
    /*     this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.url = await ref.getDownloadURL().toPromise();
        console.log("donde estas url",this.url);
        console.log("estas aqui maldita",this.downloadURL);

        this.db
          .collection("files")
          .add({ downloadURL: this.downloadURL, path });
      })


    );  */
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  onSaveComment() {
    console.log(this.downloadURL);
    const a = this.model3.toDateString();
    console.log('Esta es la variable a', a);
    this.data = {
      cuerpo: this.message,
      encabezado: this.titulo,
      timeStamp: a,
      url: this.url
    };
    console.log('esta es cuerpo', this.data);
    console.log('Antes de lboton', this.data.value);
    this.dataApi.addComments(this.data);
    console.log('Despues del boton', this.data.value);
    this.btnClose.nativeElement.click();
  }

  ngOnInit() {}
}

//   //Upload a file

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//   }
//   ngOnInit() {}
// }

// if (commentForm.value.key == null) {
//   //
//   let uniqueId = uuid();
//   console.log(uniqueId + "uniqueID");
//   commentForm.value.logisticID = uniqueId;
//   console.log(commentForm.value.logisticID + "comment form");
//   let storageRef = firebase
//     .storage()
//     .ref("Logistica/" + this.fileToUpload.name);
//   // this.uploadTask = storageRef.child(`${this.basePath}/${uniqueId}`).put(this.fileToUpload);

//   this.uploadTask = storageRef.put(this.fileToUpload);
//   console.log(this.uploadTask + "uploadtask");
//   this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
//     console.log(downloadURL + "downloadURl");
//     const imageUrl = downloadURL;
//     // comment.url = imageUrl
//     commentForm.value.logisticID = uniqueId;
//     commentForm.value.url = imageUrl;
//   });

//   const b = this.model3.toLocaleString();
//   commentForm.value.timeStamp = b;
//   console.log(commentForm.value);
//   this.dataApi.addComments(commentForm.value);
// } else {
//   // Update
//   this.dataApi.updateComment(commentForm.value);
// }
// commentForm.resetForm();
// this.btnClose.nativeElement.click();
