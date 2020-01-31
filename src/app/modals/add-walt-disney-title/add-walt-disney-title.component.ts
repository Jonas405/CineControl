import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { DataApiService } from "../../services/data-api.service";
import { MovieInterface } from "../../models/movies";
import { NgForm } from "@angular/forms";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter
} from "@ng-bootstrap/ng-bootstrap";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-add-walt-disney-title",
  templateUrl: "./add-walt-disney-title.component.html",
  styleUrls: ["./add-walt-disney-title.component.css"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddWaltDisneyTitleComponent implements OnInit {
  model2: Date;
  get today() {
    return new Date();
  }

  constructor(
    public dataApi: DataApiService,
    public calendar: NgbCalendar,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}
  @ViewChild("btnClose", { static: false }) btnClose: ElementRef;
  @Input() userUid: string;
  imgSrc: string;
  selectedImage: File = null;
  isSubmitted: boolean;
  movieTitle: string;
  clasificacion: string;
  fecha: any;
  data: any;

  // Main task
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
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // AQUI ES EL PATH DE DONDE SE SUBE LA IMAGEN
    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);

    // Totally optional metadata
    // The main task
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // The file's download URL
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db
          .collection("files")
          .add({ downloadURL: this.downloadURL, path });

        console.log(this.downloadURL);
      })
    );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  // AÑADE AQUI LA LOGICA PARA SUBIR LOS DATOS
  // LA DATA ES -> this.data
  onSaveDisneyTitle() {
    const a = this.model2.toDateString();
    this.data = {
      movieName: this.movieTitle,
      releaseDate: a,
      studio: "Walt Disney Studios",
      imageURL: this.downloadURL,
      typeMovie: this.clasificacion
    };
    console.log(this.data);
    this.dataApi.addDisneyTitle(this.data);
    this.btnClose.nativeElement.click();
  }

  ngOnInit(): void {}
}

// Add URL Storage

// private uploadTask: firebase.storage.UploadTask;

// onSaveDisneyTitle(disneyTitleForm: NgForm): void {
//  if (disneyTitleForm.value.key == null) {
//    // New
//    disneyTitleForm.value.studio = 'Walt Disney Studios'
//    let storageRef = firebase.storage().ref('WaltDisneyTitles/' + this.selectedImage.name);
//    this.uploadTask = storageRef.put(this.selectedImage);

//    // Firebase doc Test

//    var uploadTask = storageRef.child('SonyTitles/' + this.selectedImage.name).put(this.selectedImage);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
//  uploadTask.on('state_changed', function(snapshot){
//    // Observe state change events such as progress, pause, and resume
//    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//    console.log('Upload is ' + progress + '% done');
//    switch (snapshot.state) {
//      case firebase.storage.TaskState.PAUSED: // or 'paused'
//        console.log('Upload is paused');
//        break;
//      case firebase.storage.TaskState.RUNNING: // or 'running'
//        console.log('Upload is running');
//        break;
//    }
//  }, function(error) {
//    // Handle unsuccessful uploads
//  }, function() {
//    // Handle successful uploads on complete
//    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//      console.log('File available at', downloadURL);
//      const imageUrl = downloadURL;
//      console.log("This is the URL", imageUrl);
//      disneyTitleForm.value.imageURL = imageUrl;
//    });
//  });

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

// Upload file
/*     this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
   const imageUrl = downloadURL;
   console.log("This is the URL", imageUrl);
   sonyTitleForm.value.imageURL = imageUrl;

 }); */

//  const a = this.model2.toLocaleString();
//  disneyTitleForm.value.releaseDate = a;
//  console.log("Before to go the function upload", disneyTitleForm.value);
//  this.disneyTitlesSaveData(disneyTitleForm);

/* this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
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
       disneyTitleForm.value.imageURL = imageUrl;
     });
     ;
     disneyTitleForm.value.releaseDate = a;
     this.dataApi.addDisneyTitle(disneyTitleForm.value); */

//  } else {
//    // Update
//    this.dataApi.updateDisneyTitle(disneyTitleForm.value);
//  }
//  disneyTitleForm.resetForm();
//  this.btnClose.nativeElement.click();
// }

////// Method for check image
// imgSrc: string;
// selectedImage: File = null;
// isSubmitted: boolean;

// showPreview(event: any) {
//  if (event.target.files && event.target.files[0]) {
//    const reader = new FileReader();
//    reader.onload = (e: any) => this.imgSrc = e.target.result;
//    reader.readAsDataURL(event.target.files[0]);
//    this.selectedImage = event.target.files[0];
//  }
//  else {
//    this.imgSrc = '/assets/img/image_placeholder.jpg';
//    this.selectedImage = null;
//  }
// }

// public disneyTitlesSaveData (disneyTitleForm){
//   console.log("Final information to upload", disneyTitleForm.value);
//  this.dataApi.addDisneyTitle(disneyTitleForm.value);
// }
// }

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
