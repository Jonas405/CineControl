import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { CommentsInterface } from '../../models/comments';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/users';
import { map } from 'rxjs/operators';
import { Upload } from 'src/app/models/Upload';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor( private dataApi: DataApiService, private authService: AuthService ) { }

  private comments: CommentsInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  private user: UserInterface;


  ngOnInit() {
    this.getCommentsList();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
      }
    })
  }

  getCommentsList() {
    this.dataApi.getAllCommentsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(comments => {
      this.comments = comments;
      console.log("Comments", this.comments)
    });
  }


  deleteComment(commentKey: string){
    console.log("SELECTED", commentKey);
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteComment(commentKey).catch(err => console.log(err));
    }
  
  }

  onPreUpdateComment(comment: CommentsInterface){
    console.log("ON PRE UPGRADE", comment)
    this.dataApi.selectedComments = Object.assign({}, comment);
  }

}

