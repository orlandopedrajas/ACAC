import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

    @Input() Filter: string;
    @Input() Datatype: string;

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

    ngOnChanges() {
        switch (this.Datatype) {
            case '0': {
                this.loadRaidFloor();
                break;
            }
            case '1': {
                this.loadRaider();
                break;
            }
        }
     }

     loadRaidFloor(): void {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetReportData?raidfloorname=' + this.Filter)
        .subscribe(result => {
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
    loadRaider(): void {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetReportData2?raidername=' + this.Filter)
        .subscribe(result => {
            this.pieChartLabels = [];
            this.pieChartData = [];
            result.forEach((value) => {
                switch (value.raidfloorname) {
                    case 'Eden Savage Floor 1': {
                        value.raidfloorname = 'Resurrection';
                        break;
                    }
                    case 'Eden Savage Floor 2': {
                        value.raidfloorname = 'Descent';
                        break;
                    }
                    case 'Eden Savage Floor 3': {
                        value.raidfloorname = 'Inundation';
                        break;
                    }
                    case 'Eden Savage Floor 4': {
                        value.raidfloorname = 'Sepulture';
                        break;
                    }
                }
                this.pieChartLabels.push(value.raidfloorname);
                this.pieChartData.push(+value.reportcount);
            });
        });
    }
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }
}

