import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CheckersInterface, CheckerInterface } from '../models/checkers';
import { TheatersInterface, TheaterInterface } from '../models/theaters';
import { ManagedTheatersInterface, ManagedTheaterInterface} from '../models/managedTheaters';
import { MovieInterface, MoviesInterface} from '../models/movies';
import { CommentsInterface} from '../models/comments';
import { Observable } from 'rxjs/internal/Observable';
import { map, retryWhen } from 'rxjs/operators';
import { AngularFireList, AngularFireObject, AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import {database} from 'firebase';
import { IncidenciasInterface, IncidenciaInterface } from '../models/incidencias';
import { MaterialesSonyInterface, MaterialSonyInterface } from '../models/materialesSony';
import { MaterialesDisneyInterface, MaterialDisneyInterface } from '../models/materialesDisney';
import * as firebase from 'firebase'
import { Upload } from '../models/Upload';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private dbPathManagedTheaters = '/managedTheaters';
  managedTheatersRef: AngularFireList<ManagedTheatersInterface> = null;

  private dbPathCheckers = '/USER';
  checkersRef: AngularFireList<CheckersInterface> = null;
  

  private dbPathMoviesSony = '/TITLES/Sony Pictures Releasing';
  titlesSonyRef: AngularFireList<MoviesInterface> = null;

  private dbPathMoviesDisney = '/TITLES/Walt Disney Studios';
  titlesDisneyRef: AngularFireList<MoviesInterface> = null;

  private dbPathComments = '/Logistica'
  commentsRef: AngularFireList<CommentsInterface> = null;

  private dbPathIncidenciasPorAprobar = 'WebRef/Incidences/incidenceForApproval'
  //'incidences/incForApproval/WeekNumber'
  incidenciasPorAprobarRef : AngularFireList<IncidenciasInterface> = null;

  private dbPathIncidenciasAprobadas = 'WebRef/Incidences/incidenceApproved'
  //'incidences/incApproved/WeekNumber'
  incidenciasAprobadasRef : AngularFireList<IncidenciasInterface> = null;

  private dbPathSonyMateriales = 'WebRef/MaterialsSony Pictures Releasing';
  materialesSonyRef: AngularFireList<MaterialesSonyInterface> = null;

  private dbPathDisneyMateriales = 'WebRef/MaterialsWalt Disney Studios';
  materialesDisneyRef: AngularFireList<MaterialesDisneyInterface> = null;


  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase) {


                this.managedTheatersRef = db.list(this.dbPathManagedTheaters);
                this.checkersRef = db.list(this.dbPathCheckers);
                this.titlesSonyRef = db.list(this.dbPathMoviesSony);
                this.titlesDisneyRef = db.list(this.dbPathMoviesDisney);
                this.commentsRef = db.list(this.dbPathComments);
                this.materialesSonyRef = db.list(this.dbPathSonyMateriales);
                this.materialesDisneyRef = db.list(this.dbPathDisneyMateriales);
                this.incidenciasPorAprobarRef = db.list(this.dbPathIncidenciasPorAprobar);
                this.incidenciasAprobadasRef = db.list(this.dbPathIncidenciasAprobadas);
                
              }
              

  //---------- Services Using Database RealTime  ------------------------

  public selectedManagedTheater: ManagedTheaterInterface = {
    key: null
  };

    // ==========================  ManagedTheaters Service ==========================

  getManagedTheatersList(): AngularFireList<ManagedTheatersInterface> {
    return this.managedTheatersRef;
  }    
  
  addManagedTheaters(managedTheaters : ManagedTheatersInterface){
    this.managedTheatersRef.push(managedTheaters);
  }

  deleteManagedTheater(key: string): Promise<void> {
    return this.managedTheatersRef.remove(key);
  }

  updateManagedTheater(managedTheaters: ManagedTheaterInterface): void {
    let keyTheater = managedTheaters.key;
    console.log("UPDATE", managedTheaters);
   this.managedTheatersRef.update(keyTheater, managedTheaters)
  }

  theatery: AngularFireObject<TheaterInterface>;
    getTheaterById(key: string): AngularFireObject<TheaterInterface> {

      this.theatery = this.db.object('/managedTheaters/' + key) as AngularFireObject<TheaterInterface>;
      return this.theatery;

    }
  

    // ========================== Checkers Service ==========================

    public selectedChecker: CheckerInterface = {
      key: null
    };

    getAllCheckersList(): AngularFireList<CheckersInterface> {
      return this.checkersRef;
    }    

    
    addChecker( checker : CheckerInterface){
      this.checkersRef.push(checker);
    }

    deleteChecker(key: string): Promise<void> {
      return this.checkersRef.remove(key);
    }

    updateChecker(checker: CheckerInterface): void {
      let keyChecker = checker.key;
      console.log("UPDATE", checker);
    this.checkersRef.update(keyChecker, checker)
    }

    checky: AngularFireObject<CheckerInterface>;
    getCheckerById(key: string): AngularFireObject<CheckerInterface> {

      this.checky = this.db.object('/USER/' + key) as AngularFireObject<CheckerInterface>;
      return this.checky;

    }
    
    
/*   getOneChecker(idChecker: string) {

    this.checkerDoc = this.afs.doc<CheckerInterface>(`checkers/${idChecker}`);
    console.log("API", this.checkerDoc);
    return this.checker = this.checkerDoc.snapshotChanges().pipe(map(action => {
      console.log("API Checker", this.checker);
      if (action.payload.exists === false) {
        console.log("API", "sigue nulo");
        return null;
      } else {
        const data = action.payload.data() as CheckerInterface;
        data.id = action.payload.id;
        console.log("API DATA", data)
        return data;
      }
    }));

  } */




   // ========================== Titles Sony Service ==========================

   public selectedSonyTitle: MovieInterface = {
      key: null
    };

    getAllSonyTitlesList(): AngularFireList<MoviesInterface> {
      console.log("SONY", this.titlesSonyRef);
      return this.titlesSonyRef;
    }  

    addSonyTitle( title : MovieInterface){
      this.titlesSonyRef.push(title);
    }

    deleteSonyTitle(key: string): Promise<void> {
      return this.titlesSonyRef.remove(key);
    }

    updateSonyTitle(title: MovieInterface): void {
      let keyChecker = title.key;
      console.log("UPDATE", title);
    this.titlesSonyRef.update(keyChecker, title)
    }

    sonyTi: AngularFireObject<MovieInterface>;
    getSonyTitleByID(key: string): AngularFireObject<MovieInterface> {

      this.sonyTi = this.db.object('/TITLES/Sony Pictures Releasing/' + key) as AngularFireObject<MovieInterface>;
      return this.sonyTi;

    }

       // ========================== Titles Disney Service ==========================

   public selectedDisneyTitle: MovieInterface = {
    key: null
  };

  getAllDisneyTitlesList(): AngularFireList<MoviesInterface> {
    console.log("SONY", this.titlesDisneyRef);
    return this.titlesDisneyRef;
  }  

  addDisneyTitle( title : MovieInterface){
    this.titlesDisneyRef.push(title);
  }

  deleteDisneyTitle(key: string): Promise<void> {
    return this.titlesDisneyRef.remove(key);
  }

  updateDisneyTitle(title: MovieInterface): void {
    let keyChecker = title.key;
    console.log("UPDATE", title);
  this.titlesDisneyRef.update(keyChecker, title)
  }

  disneyTi: AngularFireObject<MovieInterface>;
  getDisneyTitleByID(key: string): AngularFireObject<MovieInterface> {

    this.disneyTi = this.db.object('/TITLES/Walt Disney Studios/' + key) as AngularFireObject<MovieInterface>;
    return this.disneyTi;

  }

       // ========================== Upload File Logistic Service ==========================

       
     

       pushUpload(upload: Upload){
        let storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
        
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            console.log(error)
          },
          () => {
            upload.url = this.uploadTask.snapshot.downloadURL
            upload.name = upload.file.name
            this.saveFileData(upload)
          })}

           // Writes the file details to the realtime db
        private saveFileData(upload: Upload) {
          this.db.list(`${this.basePath}/`).push(upload);
        } 

 //-------------------------------



    //-------------------------------
                
      deleteUpload(upload: Upload){
        this.deleteFileData(upload.$key)
        .then(() => {
          this.deleteFileStorage(upload.name)
        })
        .catch(error => console.log(error))
      }

      private deleteFileData(key: string){
        return this.db.list(`${this.basePath}/`).remove(key);
      }

      private deleteFileStorage(name:string){
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete()
      }


      ///======================= Comments Service =============================///

       public selectedComments: CommentsInterface = {
        key: null
      };
    
       //upload file
       private basePath:string = '/Logistica';
       private uploadTask: firebase.storage.UploadTask;


      getAllCommentsList(): AngularFireList<CommentsInterface> {
        console.log("COMMENTS", this.commentsRef);
        return this.commentsRef;
      }  
    
       addComments( comment : CommentsInterface, upload: Upload){
        //
        let storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
        
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            console.log(error)
          },
          () => {
            comment.file = upload.url = this.uploadTask.snapshot.downloadURL;
            comment.name = upload.name = upload.file.name
            console.log("file url", comment.file)
            console.log("file name", comment.name)
            console.log("StorageReference", storageRef);
         //   this.saveFileData(upload)
          })
        //
        this.commentsRef.push(comment);
      } 
    
      deleteComment(key: string): Promise<void> {
        return this.commentsRef.remove(key);
      }
    
      updateComment(comment: CommentsInterface): void {
        let keyComment = comment.key;
        console.log("UPDATE", comment.key);
      this.commentsRef.update(keyComment, comment)
      }


        // ========================== Sony Materiales Service ==========================

        public selectedSonyMaterial: MaterialSonyInterface = {
          key: null
        };
    
        getAllMaterialesSonyList(): AngularFireList<MaterialesSonyInterface> {
          console.log("SONY MATERIALES", this.materialesSonyRef);
          return this.materialesSonyRef;
        }  
    
        addMaterialSony( materialSony : MaterialSonyInterface){
          this.materialesSonyRef.push(materialSony);
        }
    
        deleteMaterialSony(key: string): Promise<void> {
          return this.materialesSonyRef.remove(key);
        }
    
        updateMaterialSony(sonyMaterial: MaterialSonyInterface): void {
          let keyChecker = sonyMaterial.key;
          console.log("UPDATE", sonyMaterial);
        this.titlesSonyRef.update(keyChecker, sonyMaterial)
        }

        // ========================== Disney Materiales Service ==========================

        public selectedDisneyMaterial: MaterialDisneyInterface = {
        key: null
      };
  
      getAllMaterialesDisneyList(): AngularFireList<MaterialesDisneyInterface> {
        console.log("Disney MATERIALES", this.materialesDisneyRef);
        return this.materialesDisneyRef;
      }  
  
      addMaterialDisney( materialDisney : MaterialDisneyInterface){
        this.materialesDisneyRef.push(materialDisney);
      }
  
      deleteMaterialDisney(key: string): Promise<void> {
        return this.materialesDisneyRef.remove(key);
      }
  
      updateMaterialDisney(disneyMaterial: MaterialDisneyInterface): void {
        let keyChecker = disneyMaterial.key;
        console.log("UPDATE", disneyMaterial);
      this.titlesSonyRef.update(keyChecker, disneyMaterial)
      }

     // ========================== IncidenciasPorAprobar Service ==========================

        public selectedIncidenciaPorAprobar: IncidenciaInterface = {
        key: null
      };
  
      getAllIncidenciasPorAprobarList(): AngularFireList<IncidenciasInterface> {
        console.log("Incidencias", this.incidenciasPorAprobarRef);
        return this.incidenciasPorAprobarRef;
      }  
  
      addIncidencia( incidencia : IncidenciaInterface){
        this.incidenciasPorAprobarRef.push(incidencia);
      }
  
      deleteIncidenciaPorAprobar(key: string): Promise<void> {
        return this.incidenciasPorAprobarRef.remove(key);
      }
  
      updateIncidenciaPorAprobar(incidencia: IncidenciaInterface): void {
        let keyIncidencia = incidencia.key;
        console.log("UPDATE", incidencia);
      this.incidenciasPorAprobarRef.update(keyIncidencia, incidencia)
      }

      incidencesTi: AngularFireObject<IncidenciaInterface>;
      getIncidenceById(key: string): AngularFireObject<IncidenciaInterface> {
        this.incidencesTi = this.db.object('WebRef/Incidences/incidenceForApproval/' + key) as AngularFireObject<IncidenciaInterface>;
        return this.incidencesTi;

  }

        // ========================== Aprobadas Service ==========================

        public selectedIncidenciaAprobadas: IncidenciaInterface = {
          key: null
        };
    
        getAllIncidenciasAprobadasList(): AngularFireList<IncidenciasInterface> {
          console.log("Incidencias", this.incidenciasAprobadasRef);
          return this.incidenciasAprobadasRef;
        }  
    
        addIncidenciaAprobada( incidencia : IncidenciaInterface){
          this.incidenciasAprobadasRef.push(incidencia);
        }
    
        deleteIncidenciaAprobada(key: string): Promise<void> {
          return this.incidenciasAprobadasRef.remove(key);
        }
    
        updateIncidenciaAprobada(incidencia: IncidenciaInterface): void {
          let keyIncidencia = incidencia.key;
          console.log("UPDATE", incidencia);
        this.incidenciasAprobadasRef.update(keyIncidencia, incidencia)
        }



  //---------- Services Using Database CloudFireStore ------------------------

/*

  Also for this requerimients I was used id for idetification and then for the other
  database I´ll used key relation 

  private checkersCollection: AngularFirestoreCollection<CheckersInterface>;
  private checkers: Observable<CheckersInterface[]>;
  private checkerDoc: AngularFirestoreDocument<CheckerInterface>;
  private checker: Observable<CheckerInterface>;
  public selectedChecker: CheckerInterface = {
    id: null
  };

  private theatersCollection: AngularFirestoreCollection<CheckersInterface>;
  private theaters: Observable<TheatersInterface[]>;
  private theaterDoc: AngularFirestoreDocument<TheatersInterface>;
  private theater: Observable<TheaterInterface>;
  public selectedTheater: TheaterInterface = {
    id: null
  };

 
  

  getAllCheckers() {
    this.checkersCollection = this.afs.collection<CheckersInterface>('checkers');
    return this.checkers = this.checkersCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CheckersInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getAllTheaters(){ 
     this.theatersCollection = this.afs.collection<TheatersInterface>('theaters');
  return this.theaters = this.theatersCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as TheatersInterface;
        data.id = action.payload.doc.id;
        console.log("API CINE", data);
        return data;
      });
    }));}



  getOneChecker(idChecker: string) {

    this.checkerDoc = this.afs.doc<CheckerInterface>(`checkers/${idChecker}`);
    console.log("API", this.checkerDoc);
    return this.checker = this.checkerDoc.snapshotChanges().pipe(map(action => {
      console.log("API Checker", this.checker);
      if (action.payload.exists === false) {
        console.log("API", "sigue nulo");
        return null;
      } else {
        const data = action.payload.data() as CheckerInterface;
        data.id = action.payload.id;
        console.log("API DATA", data)
        return data;
      }
    }));

  }

  getOneTheater(idTheater: string) {
    this.theaterDoc = this.afs.doc<TheaterInterface>(`theaters/${idTheater}`);
    return this.theater = this.theaterDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as TheaterInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addChecker(checker: CheckerInterface): void {
    this.checkersCollection.add(checker);
   
  }

  addTheater(theater: TheaterInterface): void {
    this.theatersCollection.add(theater);
    console.log("API add Checker", theater);
  }

  updateChecker(checker: CheckerInterface): void {
    let idChecker = checker.id;
    console.log("API Update Checker", idChecker);
    this.checkerDoc = this.afs.doc<CheckerInterface>(`checkers/${idChecker}`);
    console.log("API Update Checker", this.checkerDoc);
    this.checkerDoc.update(checker);
  }

  updateTheater(theater: TheaterInterface): void {
    let idTheater = theater.id;
    this.theaterDoc = this.afs.doc<TheaterInterface>(`theaters/${idTheater}`);
    console.log("API Update Checker", theater);
    this.theaterDoc.update(theater);
  }


  deleteChecker(idChecker: string): void {
    this.checkerDoc = this.afs.doc<CheckerInterface>(`checkers/${idChecker}`);
    this.checkerDoc.delete();
  }

  deleteTheater(idTheater: string): void {
    this.theaterDoc = this.afs.doc<TheaterInterface>(`theaters/${idTheater}`);
    console.log("API Update Checker", idTheater);
    this.theaterDoc.delete();
  } */

  

}
