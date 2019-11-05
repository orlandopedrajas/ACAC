import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

    @Input() Floorname: string;
    public pieChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = [];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
          backgroundColor: ['rgba(255,0,0,0.3)',
                            'rgba(0,255,0,0.3)',
                            'rgba(0,0,255,0.3)',
                            'rgba(238, 255, 0, 0.3)',
                            'rgba(0, 255, 94, 0.3)',
                            'rgba(0, 208, 255, 0.3)',
                            'rgba(255, 0, 221, 0.3)',
                            'rgba(25, 0, 255, 0.3)'],
        },
    ];

    constructor(private http: HttpClient) { }
    ngOnInit() { }
    ngOnChanges() {
        this.loadChart();
     }

    public loadChart(): void {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetReportData?raidfloorname=' + this.Floorname)
        .subscribe(result => {
            // console.log(this.Floorname);
            // console.log(result);
            this.pieChartLabels = [];
            this.pieChartData = [];
            result.forEach((value) => {
                switch (value.raidername) {
                    case 'Aerilyn Elessedil': {
                        value.raidername = 'Aerilyn';
                        break;
                    }
                    case 'Hades Carmine': {
                        value.raidername = 'Hades';
                        break;
                    }
                    case 'Lan Mantear': {
                        value.raidername = 'Lan';
                        break;
                    }
                    case 'Shelly Duncan': {
                        value.raidername = 'Shelly';
                        break;
                    }
                    case 'Thomas Silverstar': {
                        value.raidername = 'Thomas';
                        break;
                    }
                    case 'Val Phoenix': {
                        value.raidername = 'Val';
                        break;
                    }
                    case 'Yumi Rin': {
                        value.raidername = 'Yumi';
                        break;
                    }
                }
                this.pieChartLabels.push(value.raidername);
                this.pieChartData.push(+value.reportcount);
            });
        });
    }
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    }

    changeLabels() {
        const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
          'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
          'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
          'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
          'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
        const randomWord = () => words[Math.trunc(Math.random() * words.length)];
        this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
      }

      addSlice() {
        this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
        this.pieChartData.push(400);
        this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
      }

      removeSlice() {
        this.pieChartLabels.pop();
        this.pieChartData.pop();
        this.pieChartColors[0].backgroundColor.pop();
      }

      changeLegendPosition() {
        this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
      }
}

