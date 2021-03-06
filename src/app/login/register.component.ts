import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}
  @ViewChild('imageUser', { static: false }) inputImageUser: ElementRef;

  public email = '';
  public password = '';
  public passwordConfirm: string;
  passState = '3';

  uploadPercent: Observable<number>;
  urlImage: Observable<String>;

  ngOnInit() {}

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `RegisteredUsers/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }

  onTypeConfirmPass($event) {
    if (this.password == this.passwordConfirm) {
      this.passState = '1';
    } else {
      this.passState = '0';
    }
  }

  onAddUser() {
    if (this.password == this.passwordConfirm) {
      this.authService
        .registerUser(this.email, this.password)
        .then(res => {
          this.authService.isAuth().subscribe(user => {
            if (user) {
              user
                .updateProfile({
                  displayName: '',
                  photoURL: this.inputImageUser.nativeElement.value
                })
                .then(() => {
                  this.router.navigate(['/cinema']);
                })
                .catch(error => console.log('error', error));
            }
          });
        })
        .catch(err => console.log('err', err.message));
    } else {
      return;
    }
  }
}
