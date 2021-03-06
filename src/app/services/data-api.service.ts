import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { CheckersInterface, CheckerInterface } from '../models/checkers';
import { TheatersInterface, TheaterInterface } from '../models/theaters';
import {
  ManagedTheatersInterface,
  ManagedTheaterInterface
} from '../models/managedTheaters';
import { MovieInterface, MoviesInterface } from '../models/movies';
import { CommentsInterface } from '../models/comments';
import { Observable } from 'rxjs/internal/Observable';
import { map, retryWhen } from 'rxjs/operators';
import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
  snapshotChanges
} from '@angular/fire/database';
import { database } from 'firebase';
import {
  IncidenciasInterface,
  IncidenciaInterface
} from '../models/incidencias';
import {
  MaterialesSonyInterface,
  MaterialSonyInterface
} from '../models/materialesSony';
import {
  MaterialesDisneyInterface,
  MaterialDisneyInterface
} from '../models/materialesDisney';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.managedTheatersRef = db.list(this.dbPathManagedTheaters);
    this.checkersRef = db.list(this.dbPathCheckers);
    this.titlesSonyRef = db.list(this.dbPathMoviesSony);
    this.titlesDisneyRef = db.list(this.dbPathMoviesDisney);
    this.commentsRef = db.list(this.dbPathComments);
    this.materialesSonyRef = db.list(this.dbPathSonyMateriales);
    this.materialesDisneyRef = db.list(this.dbPathDisneyMateriales);
    this.incidenciasPorAprobarRef = db.list(this.dbPathIncidenciasPorAprobar);
    this.incidenciasAprobadasRef = db.list(this.dbPathIncidenciasAprobadas);
    this.incidenciasAprobadasDisneyRef = db.list(
      this.dbPathIncidenciasAprobadasDisney
    );
    this.incidenciasAprobadasSonyRef = db.list(
      this.dbPathIncidenciasAprobadasSony
    );
    this.incidenciasPorAprobarDisneyRef = db.list(
      this.dbPathIncidenciasPorAprobarDisney
    );
    this.incidenciasPorAprobarSonyRef = db.list(
      this.dbPathIncidenciasPorAprobarSony
    );

    this.getAllMaterialesSonyList();
  }
  materialesSony: Array<any>;
  public MovieKey: any;

  private dbPathManagedTheaters = '/managedTheaters';
  managedTheatersRef: AngularFireList<ManagedTheatersInterface> = null;

  private dbPathCheckers = '/USER';
  checkersRef: AngularFireList<CheckersInterface> = null;

  private dbPathMoviesSony = '/TITLES/Sony Pictures Releasing';
  titlesSonyRef: AngularFireList<MoviesInterface> = null;

  private dbPathMoviesDisney = '/TITLES/Walt Disney Studios';
  titlesDisneyRef: AngularFireList<MoviesInterface> = null;

  private dbPathComments = '/Logistica';
  commentsRef: AngularFireList<CommentsInterface> = null;

  private dbPathIncidenciasPorAprobar =
    'WebRef/Incidences/incidenceForApprovalWeb/General';
  // 'incidences/incForApproval/WeekNumber'
  incidenciasPorAprobarRef: AngularFireList<IncidenciasInterface> = null;

  private dbPathIncidenciasAprobadas =
    'WebRef/Incidences/incidenceApproved/General';
  // 'incidences/incApproved/WeekNumber'
  incidenciasAprobadasRef: AngularFireList<IncidenciasInterface> = null;

  // Incidencias agregadas a la fecha por separado disney y sony ----------------------------------

  private dbPathIncidenciasAprobadasDisney =
    'WebRef/Incidences/incidenceApproved/Walt Disney Studios';
  // 'incidences/incApproved/WeekNumber'
  incidenciasAprobadasDisneyRef: AngularFireList<IncidenciasInterface> = null;

  private dbPathIncidenciasAprobadasSony =
    'WebRef/Incidences/incidenceApproved/Sony Pictures Releasing';
  // 'incidences/incApproved/WeekNumber'
  incidenciasAprobadasSonyRef: AngularFireList<IncidenciasInterface> = null;

  private dbPathIncidenciasPorAprobarDisney =
    'WebRef/Incidences/incidenceForApprovalWeb/Walt Disney Studios';
  // 'incidences/incApproved/WeekNumber'
  incidenciasPorAprobarDisneyRef: AngularFireList<IncidenciasInterface> = null;

  private dbPathIncidenciasPorAprobarSony =
    'WebRef/Incidences/incidenceForApprovalWeb/Sony Pictures Releasing';
  // 'incidences/incApproved/WeekNumber'
  incidenciasPorAprobarSonyRef: AngularFireList<IncidenciasInterface> = null;

  // ----------------------------------------------------------------------------------------

  // -------------------------------------------
  private dbPathSonyMateriales = 'WebRef/MaterialsSony Pictures Releasing';
  materialesSonyRef: AngularFireList<MaterialesSonyInterface> = null;

  private dbPathDisneyMateriales = 'WebRef/MaterialsWalt Disney Studios';
  materialesDisneyRef: AngularFireList<MaterialesDisneyInterface> = null;

  // ---------- Services Using Database RealTime  ------------------------

  public selectedManagedTheater: ManagedTheaterInterface = {
    key: null
  };

  theatery: AngularFireObject<TheaterInterface>;

  // ========================== Checkers Service ==========================

  public selectedChecker: CheckerInterface = {
    key: null
  };

  checky: AngularFireObject<CheckerInterface>;

  // Asignar cine a checker
  public selectedAssigTheaterChecker: ManagedTheaterInterface = {
    key: null
  };

  managedy: AngularFireObject<ManagedTheaterInterface>;

  // ========================== Titles Sony Service ==========================

  public selectedSonyTitle: MovieInterface = {
    key: null
  };

  sonyTi: AngularFireObject<MovieInterface>;

  // ========================== Titles Disney Service ==========================

  public selectedDisneyTitle: MovieInterface = {
    key: null
  };

  disneyTi: AngularFireObject<MovieInterface>;

  /// ======================= Comments Service =============================///

  public selectedComments: CommentsInterface = {
    key: null
  };

  // ========================== Sony Materiales Service ==========================

  public selectedSonyMaterial: MaterialSonyInterface = {
    key: null
  };

  /*   updateMaterialSony(sonyMaterial: MaterialSonyInterface): void {
          let keyChecker = sonyMaterial.key;
          console.log("UPDATE", sonyMaterial);
        this.titlesSonyRef.update(keyChecker, sonyMaterial)
        }
 */
  // ========================== Disney Materiales Service ==========================

  public selectedDisneyMaterial: MaterialDisneyInterface = {
    key: null
  };

  /*   updateMaterialDisney(disneyMaterial: MaterialDisneyInterface): void {
        let keyChecker = disneyMaterial.key;
        console.log("UPDATE", disneyMaterial);
      this.titlesSonyRef.update(keyChecker, disneyMaterial)
      } */

  // ========================== IncidenciasPorAprobar Service ==========================

  public selectedIncidenciaPorAprobar: IncidenciaInterface = {
    key: null
  };

  incidencesTi: AngularFireObject<IncidenciaInterface>;

  // ========================== IncidenciasPorAprobar Service Disney ==========================

  public selectedIncidenciaPorAprobarDisney: IncidenciaInterface = {
    key: null
  };

  incidencesTiDisney: AngularFireObject<IncidenciaInterface>;

  // ========================== IncidenciasPorAprobar Service Sony ==========================

  public selectedIncidenciaPorAprobarSony: IncidenciaInterface = {
    key: null
  };

  incidencesTiSony: AngularFireObject<IncidenciaInterface>;

  // ========================== Incidencias Aprobadas Service ==========================

  public selectedIncidenciaAprobadas: IncidenciaInterface = {
    key: null
  };

  incidencesTiApproved: AngularFireObject<IncidenciaInterface>;

  // ========================== Incidencias Aprobadas Service Disney ==========================

  public selectedIncidenciaAprobadasDisney: IncidenciaInterface = {
    key: null
  };

  incidencesTiApprovedDisney: AngularFireObject<IncidenciaInterface>;

  // ========================== Incidencias Aprobadas Service Sony ==========================

  public selectedIncidenciaAprobadasSony: IncidenciaInterface = {
    key: null
  };

  incidencesTiApprovedSony: AngularFireObject<IncidenciaInterface>;

  // ==========================  ManagedTheaters Service ==========================

  getAllImages() {
    // Since you mentioned your images are in a folder,
    // we'll create a Reference to that folder:
    var storageRef = firebase.storage().ref("WebAdminDownloadTest")


    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        // And finally display them
        displayImage(imageRef);
      });
    }).catch(function(error) {
      console.log(error)
    });

    function displayImage(imageRef) {
      imageRef.getDownloadURL().then(function(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
      }).catch(function(error) {
        // Handle any errors
      });
    }
  }


  getManagedTheatersList(): AngularFireList<ManagedTheatersInterface> {
    return this.managedTheatersRef;
  }

  addManagedTheaters(managedTheaters: ManagedTheatersInterface) {
    this.managedTheatersRef.push(managedTheaters);
  }

  deleteManagedTheater(key: string): Promise<void> {
    return this.managedTheatersRef.remove(key);
  }

  updateManagedTheater(managedTheaters: ManagedTheaterInterface): void {
    const keyTheater = managedTheaters.key;
    this.managedTheatersRef.update(keyTheater, managedTheaters);
  }
  getTheaterById(key: string): AngularFireObject<TheaterInterface> {
    this.theatery = this.db.object(
      '/managedTheaters/' + key
    ) as AngularFireObject<TheaterInterface>;
    return this.theatery;
  }

  getAllCheckersList(): AngularFireList<CheckersInterface> {
    return this.checkersRef;
  }

  addChecker(checker: CheckerInterface) {
    this.checkersRef.push(checker);
  }

  deleteChecker(key: string): Promise<void> {
    return this.checkersRef.remove(key);
  }

  updateChecker(checker: CheckerInterface): void {
    const keyChecker = checker.key;
    this.checkersRef.update(keyChecker, checker);
  }
  getCheckerById(key: string): AngularFireObject<CheckerInterface> {
    this.checky = this.db.object('/USER/' + key) as AngularFireObject<
      CheckerInterface
    >;
    return this.checky;
  }
  getAssigTheaterChecker(
    key: string
  ): AngularFireObject<ManagedTheaterInterface> {
    this.managedy = this.db.object(
      '/USER/' + key + '/asignedTheaters'
    ) as AngularFireObject<ManagedTheaterInterface>;
    return this.managedy;
  }

  getAllSonyTitlesList(): AngularFireList<MoviesInterface> {
    console.log('SONY', this.titlesSonyRef);
    return this.titlesSonyRef;
  }

  addSonyTitle(title: MovieInterface) {
    this.titlesSonyRef.push(title);
  }

  deleteSonyTitle(key: string): Promise<void> {
    return this.titlesSonyRef.remove(key);
  }

  updateSonyTitle(title: MovieInterface): void {
    const keyChecker = title.key;
    this.titlesSonyRef.update(keyChecker, title);
  }
  getSonyTitleByID(key: string): AngularFireObject<MovieInterface> {
    this.sonyTi = this.db.object(
      '/TITLES/Sony Pictures Releasing/' + key
    ) as AngularFireObject<MovieInterface>;
    return this.sonyTi;
  }

  getAllDisneyTitlesList(): AngularFireList<MoviesInterface> {
    return this.titlesDisneyRef;
  }

  addDisneyTitle(title) {
    this.titlesDisneyRef.push(title);
  }

  deleteDisneyTitle(key: string): Promise<void> {
    return this.titlesDisneyRef.remove(key);
  }

  updateDisneyTitle(title: MovieInterface): void {
    const keyChecker = title.key;
    this.titlesDisneyRef.update(keyChecker, title);
  }
  getDisneyTitleByID(key: string): AngularFireObject<MovieInterface> {
    this.disneyTi = this.db.object(
      '/TITLES/Walt Disney Studios/' + key
    ) as AngularFireObject<MovieInterface>;
    return this.disneyTi;
  }

  getAllCommentsList(): AngularFireList<CommentsInterface> {
    return this.commentsRef;
  }

  addComments(comment: CommentsInterface) {
    this.commentsRef.push(comment);
  }

  deleteComment(key: string): Promise<void> {
    return this.commentsRef.remove(key);
  }

  updateComment(comment: CommentsInterface): void {
    const keyComment = comment.key;
    this.commentsRef.update(keyComment, comment);
  }

  getAllMaterialesSonyList() {
    this.materialesSonyRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(materialesSony => {
        this.materialesSony = materialesSony;
      });
  }

  addMaterialSony(materialSony: MaterialSonyInterface) {
    this.materialesSonyRef.push(materialSony);
  }

  deleteMaterialSony(key: string): Promise<void> {
    return this.materialesSonyRef.remove(key);
  }

  getAllMaterialesDisneyList(): AngularFireList<MaterialesDisneyInterface> {
    return this.materialesDisneyRef;
  }

  addMaterialDisney(materialDisney: MaterialDisneyInterface) {
    this.materialesDisneyRef.push(materialDisney);
  }

  deleteMaterialDisney(key: string): Promise<void> {
    return this.materialesDisneyRef.remove(key);
  }

  getAllIncidenciasPorAprobarList(): AngularFireList<IncidenciasInterface> {
    return this.incidenciasPorAprobarRef;
  }

  addIncidencia(incidencia: IncidenciaInterface) {
    this.incidenciasPorAprobarRef.push(incidencia);
  }

  deleteIncidenciaPorAprobar(key: string): Promise<void> {
    return this.incidenciasPorAprobarRef.remove(key);
  }

  updateIncidenciaPorAprobar(incidencia: IncidenciaInterface): void {
    const keyIncidencia = incidencia.key;
    this.incidenciasPorAprobarRef.update(keyIncidencia, incidencia);
  }
  getIncidenceById(key: string): AngularFireObject<IncidenciaInterface> {
    this.incidencesTi = this.db.object(
      'WebRef/Incidences/incidenceForApproval/' + key
    ) as AngularFireObject<IncidenciaInterface>;
    return this.incidencesTi;
  }

  getAllIncidenciasPorAprobarListDisney(): AngularFireList<
    IncidenciasInterface
  > {
    return this.incidenciasPorAprobarDisneyRef;
  }

  addIncidenciaDisney(incidencia: IncidenciaInterface) {
    this.incidenciasPorAprobarDisneyRef.push(incidencia);
  }

  deleteIncidenciaPorAprobarDisney(key: string): Promise<void> {
    return this.incidenciasPorAprobarDisneyRef.remove(key);
  }

  updateIncidenciaPorAprobarDisney(incidencia: IncidenciaInterface): void {
    const keyIncidencia = incidencia.key;
    this.incidenciasPorAprobarDisneyRef.update(keyIncidencia, incidencia);
  }
  getIncidenceByIdDisney(key: string): AngularFireObject<IncidenciaInterface> {
    this.incidencesTi = this.db.object(
      'WebRef/Incidences/incidenceForApprovalWeb/Walt Disney Studios' + key
    ) as AngularFireObject<IncidenciaInterface>;
    return this.incidencesTi;
  }

  getAllIncidenciasPorAprobarListSony(): AngularFireList<IncidenciasInterface> {
    return this.incidenciasPorAprobarSonyRef;
  }

  addIncidenciaSony(incidencia: IncidenciaInterface) {
    this.incidenciasPorAprobarSonyRef.push(incidencia);
  }

  deleteIncidenciaPorAprobarSony(key: string): Promise<void> {
    return this.incidenciasPorAprobarSonyRef.remove(key);
  }

  updateIncidenciaPorAprobarSony(incidencia: IncidenciaInterface): void {
    const keyIncidencia = incidencia.key;
    this.incidenciasPorAprobarSonyRef.update(keyIncidencia, incidencia);
  }
  getIncidenceByIdSony(key: string): AngularFireObject<IncidenciaInterface> {
    this.incidencesTi = this.db.object(
      'WebRef/Incidences/incidenceForApprovalWeb/Sony Pictures Releasing' + key
    ) as AngularFireObject<IncidenciaInterface>;
    return this.incidencesTi;
  }

  getAllIncidenciasAprobadasList(): AngularFireList<IncidenciasInterface> {
    return this.incidenciasAprobadasRef;
  }

  addIncidenciaAprobada(incidencia: IncidenciaInterface) {
    this.incidenciasAprobadasRef.push(incidencia);
  }

  deleteIncidenciaAprobada(key: string): Promise<void> {
    return this.incidenciasAprobadasRef.remove(key);
  }

  updateIncidenciaAprobada(incidencia: IncidenciaInterface): void {
    const keyIncidencia = incidencia.key;
    this.incidenciasAprobadasRef.update(keyIncidencia, incidencia);
  }
  getIncidenceByIdApproved(
    key: string
  ): AngularFireObject<IncidenciaInterface> {
    this.incidencesTi = this.db.object(
      'WebRef/Incidences/incidenceApproved/' + key
    ) as AngularFireObject<IncidenciaInterface>;
    return this.incidencesTi;
  }

  getAllIncidenciasAprobadasListDisney(): AngularFireList<
    IncidenciasInterface
  > {
    return this.incidenciasAprobadasDisneyRef;
  }

  addIncidenciaAprobadaDisney(incidencia: IncidenciaInterface) {
    this.incidenciasAprobadasDisneyRef.push(incidencia);
  }

  deleteIncidenciaAprobadaDisney(key: string): Promise<void> {
    return this.incidenciasAprobadasDisneyRef.remove(key);
  }

  updateIncidenciaAprobadaDisney(incidencia: IncidenciaInterface): void {
    const keyIncidencia = incidencia.key;
    console.log('UPDATE', incidencia);
    this.incidenciasAprobadasDisneyRef.update(keyIncidencia, incidencia);
  }
  getIncidenceByIdApprovedDisney(
    key: string
  ): AngularFireObject<IncidenciaInterface> {
    this.incidencesTi = this.db.object(
      'WebRef/Incidences/incidenceApproved/Walt Disney Studios' + key
    ) as AngularFireObject<IncidenciaInterface>;
    return this.incidencesTi;
  }

  getAllIncidenciasAprobadasListSony(): AngularFireList<IncidenciasInterface> {
    console.log('Incidencias', this.incidenciasAprobadasSonyRef);
    return this.incidenciasAprobadasSonyRef;
  }

  addIncidenciaAprobadaSony(incidencia: IncidenciaInterface) {
    this.incidenciasAprobadasSonyRef.push(incidencia);
  }

  deleteIncidenciaAprobadaSony(key: string): Promise<void> {
    return this.incidenciasAprobadasSonyRef.remove(key);
  }

  updateIncidenciaAprobadaSony(incidencia: IncidenciaInterface): void {
    const keyIncidencia = incidencia.key;
    console.log('UPDATE', incidencia);
    this.incidenciasAprobadasSonyRef.update(keyIncidencia, incidencia);
  }
  getIncidenceByIdApprovedSony(
    key: string
  ): AngularFireObject<IncidenciaInterface> {
    this.incidencesTi = this.db.object(
      'WebRef/Incidences/incidenceApproved/Sony Pictures Releasing' + key
    ) as AngularFireObject<IncidenciaInterface>;
    return this.incidencesTi;
  }

  // ---------- Services Using Database CloudFireStore ------------------------

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
