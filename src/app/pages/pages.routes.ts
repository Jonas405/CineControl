import { RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { CheckersComponent } from './checkers/checkers.component'
import { CheckersDetailComponent } from './checkers-detail/checkers-detail.component';
import { CineDetailComponent } from './cine-detail/cine-detail.component';
import { CinemaComponent } from './cinema/cinema.component';
import { CommentsComponent } from './comments/comments.component';
import { HomeComponent } from './home/home.component'; 
import { AssignComponent } from './assign/assign.component';
import { ProfileComponent } from './profile/profile.component';
import { IncidentComponent} from './incident/incident.component';
import { IncidentDetailComponent} from './incident-detail/incident-detail.component';
import { SonyPicturesReleasingComponent} from './titles/sony-pictures-releasing/sony-pictures-releasing.component';
import { SonyPicturesReleasingDetailComponent} from './titles/sony-pictures-releasing-detail/sony-pictures-releasing-detail.component';
import { WaltDisneyStudiosComponent } from './titles/walt-disney-studios/walt-disney-studios.component';
import { WaltDisneyStudiosDetailComponent } from './titles/walt-disney-studios-detail/walt-disney-studios-detail.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DisneyMaterialesComponent } from './materiales/disney-materiales/disney-materiales.component';
import { SonyMaterialesComponent} from './materiales/sony-materiales/sony-materiales.component';
import { IncidentApprovedComponent } from './incident-approved/incident-approved.component';
import { IncidentApprovedDetailComponent } from './incident-approved-detail/incident-approved-detail.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children:[
            { path: 'checkers', component: CheckersComponent , data: { tittle: 'Checkers' }},
            { path: 'checkersdetail/:id', component: CheckersDetailComponent, data: { tittle: 'CheckersDetail' }},
            { path: 'cinedetail/:id', component: CineDetailComponent, data: { tittle: 'CineDetail' }},
            { path: 'cinema', component: CinemaComponent, data: { tittle: 'Cinema' }},
            { path: 'sonyTitle/:id', component: SonyPicturesReleasingDetailComponent, data: { tittle: 'SonyTitleDetail' }},
            { path: 'sonyTitles', component: SonyPicturesReleasingComponent, data: { tittle: 'SonyTitles' }},
            { path: 'waltDisneyTitle/:id', component: WaltDisneyStudiosDetailComponent, data: { tittle: 'WaltDisneyTitleDetail' }},
            { path: 'waltDisneyTitles', component: WaltDisneyStudiosComponent, data: { tittle: 'WaltDisneyTitles' }},
            { path: 'incidencedetail/:id', component: IncidentDetailComponent, data: { tittle: 'IncidentDetail' }},
            { path: 'incident', component: IncidentComponent, data: { tittle: 'Incident' }},
            { path: 'incidentApproved', component: IncidentApprovedComponent, data: { tittle: 'IncidentApproved' }},
            { path: 'incidentApprovedDetail/:id', component: IncidentApprovedDetailComponent, data: { tittle: 'IncidentApprovedDetailComponent' }},
            { path: 'materialesDisney', component: DisneyMaterialesComponent, data: { tittle: 'materialesDisney' }},
            { path: 'materialesSony', component: SonyMaterialesComponent, data: { tittle: 'materialesSony' }},
            { path: 'comments', component: CommentsComponent, data: { tittle: 'Comments' }},
            { path: 'home', component: HomeComponent, data: { tittle: 'Home' }},
           // { path: 'assignTheaters', component: AssignComponent, data: { tittle: 'AssignTheaters' }},
            { path: 'profile', component: ProfileComponent, data: { tittle: 'ProfileComponent' }},
            { path: '', redirectTo: '/cinema', pathMatch: 'full'}
        ]
    }

];



export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );