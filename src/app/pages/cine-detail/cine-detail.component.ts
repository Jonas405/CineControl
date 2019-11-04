import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cine-detail',
  templateUrl: './cine-detail.component.html',
  styleUrls:['./cine-detail.component.css']
})
export class CineDetailComponent implements OnInit {

  title = 'Cine Location';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
