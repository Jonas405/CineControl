import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataApiService } from '../../services/data-api.service';
import { CheckerInterface, CheckersInterface } from '../../models/checkers';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ManagedTheaterInterface } from 'src/app/models/managedTheaters';

@Component({
  selector: 'app-checkers-detail',
  templateUrl: './checkers-detail.component.html',
  styles: []
})
export class CheckersDetailComponent implements OnInit {
  constructor(private dataApi: DataApiService, private route: ActivatedRoute,
              private db: AngularFireDatabase, private router: Router) {}

  title = 'Checker Location';
  lat = 19.3581748;
  lng = -99.3861982;
  idChecker;

    // Asignar cine a checker

    manager: ManagedTheaterInterface;

    assigTheaterCheckerRef: AngularFireList<ManagedTheaterInterface> = null;


  pageActual = 1;

  checker: CheckerInterface;

  private dbPathAssigTheaterChecker = '/USER/' + this.idChecker + '/asignedTheaters';

  ngOnInit() {


     this.route.params.subscribe(params => {
      const id = params.id;
      this.idChecker = id;
      this.dbPathAssigTheaterChecker = '/USER/' + this.idChecker + '/asignedTheaters';
      if (id) {
        this.dataApi.getCheckerById(id).snapshotChanges()
          .subscribe(res => {
            if ((res.payload.exists())) {
              this.checker = res.payload.toJSON() as CheckerInterface;
              this.checker.key = res.key;
              return this.idChecker;
            } else {
            //  this.notificationService.dispatchErrorMessage('Todo does not exist');
              this.router.navigate(['/cinema']);
            }
          }, err => {
            // this.notificationService.dispatchErrorMessage(err.toString());
            // debugger;
          });
      }
    });
  }

  deleteAssigTheater(key: string): Promise<void> {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
    this.assigTheaterCheckerRef = this.db.list(this.dbPathAssigTheaterChecker);
    return this.assigTheaterCheckerRef.remove(key);

    }
  }

  onPreUpdateAssigTheater(theater: ManagedTheaterInterface) {
    this.dataApi.selectedAssigTheaterChecker = Object.assign({}, theater);
  }

  toArray(asignedTheaters: object) {
    return Object.keys(asignedTheaters).map(key => ({
      key,
      ...asignedTheaters[key]

    }));
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


