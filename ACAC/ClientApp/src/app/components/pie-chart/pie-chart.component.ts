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

    chartlabelcolor = getComputedStyle(document.body).getPropertyValue('--chart-label-color');
    chartlegendlabelcolor = getComputedStyle(document.body).getPropertyValue('--chart-legend-label-color');
   

    public pieChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
            labels: { fontColor: this.chartlegendlabelcolor }
        },
        plugins: {
            datalabels: {
                color: this.chartlabelcolor,
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
          backgroundColor: ['#488f31',
                            '#409a70',
                            '#67ad75',
                            '#8cbf7a',
                            '#b1d082',
                            '#d8e18c',
                            '#fff199',
                            '#fcd57e',
                            '#f9b969',
                            '#f49c5a',
                            '#ec7e52',
                            '#e25f4f',
                            '#de425b'],
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
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetItemDropReportByFloor?contentid=' + this.Filter)
        .subscribe(result => {
            this.pieChartLabels = [];
            this.pieChartData = [];
            result.forEach((value) => {
                this.pieChartLabels.push(value.reportName.split(' ', 1));
                this.pieChartData.push(+value.reportValue);
            });
        });
    }
    loadRaider(): void {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetItemDropReportByRaider?raidername=' + this.Filter)
        .subscribe(result => {
            this.pieChartLabels = [];
            this.pieChartData = [];
            result.forEach((value) => {
                this.pieChartLabels.push(value.reportName);
                this.pieChartData.push(+value.reportValue);
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

