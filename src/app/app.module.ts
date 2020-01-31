import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Routes
import { APP_ROUTES } from "./app.routes";
import { PAGES_ROUTES } from "./pages/pages.routes";

// Angular Maps
import { AgmCoreModule } from "@agm/core";

// Angular charts
import { ChartsModule } from "ng2-charts";
// Angular Carousel
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
// Angular Paginator
import { NgxPaginationModule } from "ngx-pagination";
// Angular Filter

// Firebase config
import { environment } from "../environments/environment";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";

// Forms
import { FormsModule } from "@angular/forms";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";
import { CinemaComponent } from "./pages/cinema/cinema.component";
import { HomeComponent } from "./pages/home/home.component";
import { CineDetailComponent } from "./pages/cine-detail/cine-detail.component";
import { CheckersComponent } from "./pages/checkers/checkers.component";
import { CheckersDetailComponent } from "./pages/checkers-detail/checkers-detail.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { BreadcrumbsComponent } from "./shared/breadcrumbs/breadcrumbs.component";
import { CommentsComponent } from "./pages/comments/comments.component";
import { AddCheckerComponent } from "./modals/add-checker/add-checker.component";
import { AddTheatersComponent } from "./modals/add-theaters/add-theaters.component";
import { AssignComponent } from "./pages/assign/assign.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { IncidentComponent } from "./pages/incident/incident.component";
import { IncidentDetailComponent } from "./pages/incident-detail/incident-detail.component";
import { SonyPicturesReleasingComponent } from "./pages/titles/sony-pictures-releasing/sony-pictures-releasing.component";
import { SonyPicturesReleasingDetailComponent } from "./pages/titles/sony-pictures-releasing-detail/sony-pictures-releasing-detail.component";
import { WaltDisneyStudiosComponent } from "./pages/titles/walt-disney-studios/walt-disney-studios.component";
import { WaltDisneyStudiosDetailComponent } from "./pages/titles/walt-disney-studios-detail/walt-disney-studios-detail.component";
import { AddSonyTitleComponent } from "./modals/add-sony-title/add-sony-title.component";
import { AddWaltDisneyTitleComponent } from "./modals/add-walt-disney-title/add-walt-disney-title.component";
import { AddCommentsComponent } from "./modals/add-comments/add-comments.component";
import { AddIncidenciaComponent } from "./modals/add-incidencia/add-incidencia.component";
import { SonyMaterialesComponent } from "./pages/materiales/sony-materiales/sony-materiales.component";
import { SonyMaterialesDetalleComponent } from "./pages/materiales/sony-materiales-detalle/sony-materiales-detalle.component";
import { DisneyMaterialesDetalleComponent } from "./pages/materiales/disney-materiales-detalle/disney-materiales-detalle.component";
import { DisneyMaterialesComponent } from "./pages/materiales/disney-materiales/disney-materiales.component";
import { from } from "rxjs";
import { ManagedFilterPipe } from "./pages/cinema/managed-filter.pipe";
import { CheckerFilterPipe } from "./pages/checkers/checkers-filter.pipe";
import { MaterialDisneyFilterPipe } from "./pages/materiales/disney-materiales/disney-material-filter.pipe";
import { MaterialSonyFilterPipe } from "./pages/materiales/sony-materiales/sony-material-filter.pipe";
import { TitleSonyFilterPipe } from "./pages/titles/sony-pictures-releasing/sony-title-filter.pipe";
import { TitleDisneyFilterPipe } from "./pages/titles/walt-disney-studios/walt-disney-title-filter.pipe";
import { AsigTheaterCheckerComponent } from "./modals/asig-theater-checker/asig-theater-checker.component";
import { IncidentApprovedComponent } from "./pages/incident-approved/incident-approved.component";
import { IncidentApprovedDetailComponent } from "./pages/incident-approved-detail/incident-approved-detail.component";
import { IncidentApprovedDisneyComponent } from "./pages/incident-approved-disney/incident-approved-disney.component";
import { IncidentApprovedSonyComponent } from "./pages/incident-approved-sony/incident-approved-sony.component";
import { IncidentPendingSonyComponent } from "./pages/incident-pending-sony/incident-pending-sony.component";
import { IncidentPendingDisneyComponent } from "./pages/incident-pending-disney/incident-pending-disney.component";
import { AddIncidenciaDisneyComponent } from "./modals/add-incidencia-disney/add-incidencia-disney.component";
import { AddIncidenciaSonyComponent } from "./modals/add-incidencia-sony/add-incidencia-sony.component";
import { IncidentApprovedDisneyDetailComponent } from "./pages/incident-approved-disney-detail/incident-approved-disney-detail.component";
import { IncidentApprovedSonyDetailComponent } from "./pages/incident-approved-sony-detail/incident-approved-sony-detail.component";
import { DropZoneDirective } from "./drop-zone.directive";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    CinemaComponent,
    HomeComponent,
    CineDetailComponent,
    CheckersComponent,
    CheckersDetailComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    CommentsComponent,
    AddCheckerComponent,
    AddTheatersComponent,
    AssignComponent,
    ProfileComponent,
    IncidentComponent,
    IncidentDetailComponent,
    SonyPicturesReleasingComponent,
    SonyPicturesReleasingDetailComponent,
    WaltDisneyStudiosComponent,
    WaltDisneyStudiosDetailComponent,
    AddSonyTitleComponent,
    AddWaltDisneyTitleComponent,
    AddCommentsComponent,
    AddIncidenciaComponent,
    SonyMaterialesComponent,
    SonyMaterialesDetalleComponent,
    DisneyMaterialesDetalleComponent,
    DisneyMaterialesComponent,
    ManagedFilterPipe,
    CheckerFilterPipe,
    MaterialDisneyFilterPipe,
    MaterialSonyFilterPipe,
    TitleSonyFilterPipe,
    TitleDisneyFilterPipe,
    AsigTheaterCheckerComponent,
    IncidentApprovedComponent,
    IncidentApprovedDetailComponent,
    IncidentApprovedDisneyComponent,
    IncidentApprovedSonyComponent,
    IncidentPendingSonyComponent,
    IncidentPendingDisneyComponent,
    AddIncidenciaDisneyComponent,
    AddIncidenciaSonyComponent,
    IncidentApprovedDisneyDetailComponent,
    IncidentApprovedSonyDetailComponent,
    DropZoneDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PAGES_ROUTES,
    ChartsModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBt8_sZvU3q9XW_kM6dfTq8fGaERwByfH0"
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
