import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataApiService } from '../../services/data-api.service';
import { CheckerInterface } from '../../models/checkers';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkers-detail',
  templateUrl: './checkers-detail.component.html',
  styles: []
})
export class CheckersDetailComponent implements OnInit {

  title = 'Checker Location';
  lat = 51.678418;
  lng = 7.809007;

  constructor(private dataApi: DataApiService, private route: ActivatedRoute,
              private db: AngularFireDatabase, private router: Router) { }
  
  //public checker: CheckerInterface = {};
  checker: CheckerInterface; 

  ngOnInit() {


     this.route.params.subscribe(params => {
      const id = params.id;
      console.log("ID Checker", id);
      if (id) {
        this.dataApi.getCheckerById(id).snapshotChanges()
          .subscribe(res => {
            if ((res.payload.exists())) {
              this.checker = res.payload.toJSON() as CheckerInterface;
              this.checker.key = res.key;
              console.log("Checker Res", this.checker);
            } else {
            //  this.notificationService.dispatchErrorMessage('Todo does not exist');
              this.router.navigate(['/home']);
            }
          }, err => {
            //this.notificationService.dispatchErrorMessage(err.toString());
            //debugger;
          });
      }
    });
  }

   
  toArray(asignedTheaters: object) {
    return Object.keys(asignedTheaters).map(key => ({
      key,
      ...asignedTheaters[key]
     
    }))
   
  }



   }

   
  
   // console.log("DATAAPI", this.dataApi.getOneChecker(idChecker));

  
/*   getDetails(idChecker: string): void {
    this.dataApi.getOneChecker(idChecker);
    console.log
  } */

/*   getDetails(idChecker: string): void {
    console.log('URLPARAMS', idChecker);
    this.dataApi.getOneChecker(idChecker).subscribe(checker => {
      this.checker = checker;
      console.log('URLPARAMS', checker);
    });
  } */
/* 
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
 */


