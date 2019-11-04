import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CommentsInterface } from '../../models/comments';
import { NgForm } from '@angular/forms';
import { Upload } from 'src/app/models/Upload';
import { v4 as uuid } from 'uuid';



@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit {
  
  selectedFiles: FileList;
  currentUpload: Upload;
  
  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false} ) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveComment(commentForm: NgForm): void {
    if (commentForm.value.key == null) {
      //
      let file = this.selectedFiles.item(0)
      this.currentUpload = new Upload(file);

      //
      // New 
      let uniqueId = uuid();
      console.log("UNIQUE ID", uniqueId);
      commentForm.value.logisticID = uniqueId;
      commentForm.value.name = Upload.name;

      console.log("URL???", this.currentUpload);
      console.log("Upload Class", Upload);
      this.dataApi.addComments(commentForm.value, this.currentUpload);
    } else {
      // Update
      this.dataApi.updateComment(commentForm.value);
    }
    commentForm.resetForm();
    this.btnClose.nativeElement.click();
  }

   //Upload a file 
    detectFiles(event: { target: { files: FileList; }; }) {
      this.selectedFiles = event.target.files;
    }

  /*   uploadSingle() {
      let file = this.selectedFiles.item(0)
      this.currentUpload = new Upload(file);
      this.dataApi.pushUpload(this.currentUpload)
      } */

}
