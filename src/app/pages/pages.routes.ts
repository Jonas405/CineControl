import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { CheckersComponent } from "./checkers/checkers.component";
import { CheckersDetailComponent } from "./checkers-detail/checkers-detail.component";
import { CineDetailComponent } from "./cine-detail/cine-detail.component";
import { CinemaComponent } from "./cinema/cinema.component";
import { CommentsComponent } from "./comments/comments.component";
import { HomeComponent } from "./home/home.component";
import { AssignComponent } from "./assign/assign.component";
import { ProfileComponent } from "./profile/profile.component";
import { IncidentComponent } from "./incident/incident.component";
import { IncidentDetailComponent } from "./incident-detail/incident-detail.component";
import { SonyPicturesReleasingComponent } from "./titles/sony-pictures-releasing/sony-pictures-releasing.component";
import { SonyPicturesReleasingDetailComponent } from "./titles/sony-pictures-releasing-detail/sony-pictures-releasing-detail.component";
import { WaltDisneyStudiosComponent } from "./titles/walt-disney-studios/walt-disney-studios.component";
import { WaltDisneyStudiosDetailComponent } from "./titles/walt-disney-studios-detail/walt-disney-studios-detail.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { DisneyMaterialesComponent } from "./materiales/disney-materiales/disney-materiales.component";
import { SonyMaterialesComponent } from "./materiales/sony-materiales/sony-materiales.component";
import { IncidentApprovedComponent } from "./incident-approved/incident-approved.component";
import { IncidentApprovedDetailComponent } from "./incident-approved-detail/incident-approved-detail.component";
import { IncidentApprovedDisneyComponent } from "./incident-approved-disney/incident-approved-disney.component";
import { IncidentApprovedSonyComponent } from "./incident-approved-sony/incident-approved-sony.component";
import { IncidentPendingDisneyComponent } from "./incident-pending-disney/incident-pending-disney.component";
import { IncidentPendingSonyComponent } from "./incident-pending-sony/incident-pending-sony.component";

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "checkers",
        component: CheckersComponent,
        data: { tittle: "Checkers" },
        canActivate: [AuthGuard]
      },
      {
        path: "checkersdetail/:id",
        component: CheckersDetailComponent,
        data: { tittle: "CheckersDetail" },
        canActivate: [AuthGuard]
      },
      {
        path: "cinedetail/:id",
        component: CineDetailComponent,
        data: { tittle: "CineDetail" },
        canActivate: [AuthGuard]
      },
      {
        path: "cinema",
        component: CinemaComponent,
        data: { tittle: "Cinema" },
        canActivate: [AuthGuard]
      },
      {
        path: "sonyTitle/:id",
        component: SonyPicturesReleasingDetailComponent,
        data: { tittle: "SonyTitleDetail" },
        canActivate: [AuthGuard]
      },
      {
        path: "sonyTitles",
        component: SonyPicturesReleasingComponent,
        data: { tittle: "SonyTitles" },
        canActivate: [AuthGuard]
      },
      {
        path: "waltDisneyTitle/:id",
        component: WaltDisneyStudiosDetailComponent,
        data: { tittle: "WaltDisneyTitleDetail" },
        canActivate: [AuthGuard]
      },
      {
        path: "waltDisneyTitles",
        component: WaltDisneyStudiosComponent,
        data: { tittle: "WaltDisneyTitles" },
        canActivate: [AuthGuard]
      },
      {
        path: "incidencedetail/:id",
        component: IncidentDetailComponent,
        data: { tittle: "IncidentDetail" },
        canActivate: [AuthGuard]
      },
      {
        path: "incident",
        component: IncidentComponent,
        data: { tittle: "Incident" },
        canActivate: [AuthGuard]
      },
      {
        path: "incidentApproved",
        component: IncidentApprovedComponent,
        data: { tittle: "IncidentApproved" },
        canActivate: [AuthGuard]
      },

      {
        path: "pendingIncidentDisney",
        component: IncidentPendingDisneyComponent,
        data: { tittle: "PendingIncidentDisney" },
        canActivate: [AuthGuard]
      },
      {
        path: "pendingIncidentSony",
        component: IncidentPendingSonyComponent,
        data: { tittle: "PendingIncidentSony" },
        canActivate: [AuthGuard]
      },

      {
        path: "incidentApprovedDisney",
        component: IncidentApprovedDisneyComponent,
        data: { tittle: "IncidentApprovedDisney" },
        canActivate: [AuthGuard]
      },
      {
        path: "incidentApprovedSony",
        component: IncidentApprovedSonyComponent,
        data: { tittle: "IncidentApprovedSony" },
        canActivate: [AuthGuard]
      },

      {
        path: "incidentApprovedDetail/:id",
        component: IncidentApprovedDetailComponent,
        data: { tittle: "IncidentApprovedDetailComponent" },
        canActivate: [AuthGuard]
      },
      {
        path: "materialesDisney",
        component: DisneyMaterialesComponent,
        data: { tittle: "materialesDisney" },
        canActivate: [AuthGuard]
      },
      {
        path: "materialesSony",
        component: SonyMaterialesComponent,
        data: { tittle: "materialesSony" }
      },
      {
        path: "comments",
        component: CommentsComponent,
        data: { tittle: "Comments" },
        canActivate: [AuthGuard]
      },
      {
        path: "home",
        component: HomeComponent,
        data: { tittle: "Home" },
        canActivate: [AuthGuard]
      },
      // { path: 'assignTheaters', component: AssignComponent, data: { tittle: 'AssignTheaters' }},
      {
        path: "profile",
        component: ProfileComponent,
        data: { tittle: "ProfileComponent" },
        canActivate: [AuthGuard]
      },
      { path: "", redirectTo: "/cinema", pathMatch: "full" }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
