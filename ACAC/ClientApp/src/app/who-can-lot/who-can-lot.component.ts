import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-who-can-lot',
  templateUrl: './who-can-lot.component.html',
  styleUrls: ['./who-can-lot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WhoCanLotComponent {

  @ViewChild('chart1', null) private chart1: PieChartComponent;

    constructor() { }

    tabChanged(t) {
      console.log(t.index);
      switch (t.index) {
        case 0: {
          this.chart1.Floorname = 'Eden Savage Floor 1';
          //this.chart1.loadChart();
          this.chart1.
          break;
        }
        case 1: {
          this.chart1.Floorname = 'Eden Savage Floor 2';
//this.chart2.loadChart();
          break;
        }
        case 2: {
          this.chart1.Floorname = 'Eden Savage Floor 3';
         // this.chart2.loadChart();
          break;
        }
        case 3: {
          this.chart1.Floorname = 'Eden Savage Floor 4';
          //this.chart2.loadChart();
          break;
        }
      }


    }
}

