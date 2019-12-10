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
        { titulo: 'Cinema', url: '/cinema' },
        { titulo : 'Checkers', url: '/checkers' },
        { titulo: 'Sony Titles', url: '/sonyTitles' },
        { titulo: 'Walt Disney Titles', url: '/waltDisneyTitles' },
        { titulo: 'Incidencias Por Aprobar', url: '/incident' },
        { titulo: 'Incidencias', url: '/incidentApproved'},
        { titulo: 'Materiales Sony', url: '/materialesSony' },
        { titulo: 'Materiales Walt Disney', url: '/materialesDisney' },
      //  { titulo: 'AssignTheaters', url: '/assignTheaters' },
        { titulo: 'Logistica', url: '/comments' }
      ]
    }
  ];

  constructor() { }

}