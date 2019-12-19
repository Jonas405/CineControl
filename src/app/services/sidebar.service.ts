import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Logistica', url: '/comments' },
        { titulo : 'Checkers', url: '/checkers' },
        { titulo: 'Cines', url: '/cinema' },
        { titulo: 'Peliculas Sony', url: '/sonyTitles' },
        { titulo: 'Materiales Sony', url: '/materialesSony' },
        { titulo: 'Incidencias por aprobar Sony', url: '/pendingIncidentSony'},
        { titulo: 'Incidencias Sony', url: '/incidentApprovedSony'},
        { titulo: 'Peliculas Disney', url: '/waltDisneyTitles' },
        { titulo: 'Materiales Disney', url: '/materialesDisney' },
        { titulo: 'Incidencias Por Aprobar Disney', url: '/pendingIncidentDisney'},
        { titulo: 'Incidencias Walt Disney', url: '/incidentApprovedDisney'},
        { titulo: 'Incidencias por aprobar Generales', url: '/incident' },
        { titulo: 'Incidencias aprobadas Generales', url: '/incidentApproved'},
     
      //  { titulo: 'AssignTheaters', url: '/assignTheaters' },
       
      ]
    }
  ];

  constructor() { }

}