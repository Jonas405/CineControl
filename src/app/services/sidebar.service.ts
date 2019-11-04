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
        { titulo: 'Home', url: '/home' },
        { titulo : 'Checkers', url: '/checkers' },
        { titulo: 'Cinema', url: '/cinema' },
        { titulo: 'Sony Titles', url: '/sonyTitles' },
        { titulo: 'Walt Disney Titles', url: '/waltDisneyTitles' },
        { titulo: 'Incident', url: '/incident' },
        { titulo: 'Sony Materials', url: '/materialesSony' },
        { titulo: 'Walt Disney Materials', url: '/materialesDisney' },
        { titulo: 'AssignTheaters', url: '/assignTheaters' },
        { titulo: 'Comments', url: '/comments' }
      ]
    }
  ];

  constructor() { }

}