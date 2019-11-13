import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss']
})

export class DoughnutChartComponent implements OnInit {

    @Input() data: any[];

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
    public doughnutChartPlugins = [pluginDataLabels];
    public doughnutChartLabels: Label[] = ['Attended', 'Absent'];
    public doughnutChartData: MultiDataSet = [
        [100, 68, 'Tuesday'],
        [59, 75, 'Thursday'],
        [38, 75, 'Monday'],
      ];
    public doughnutChartType: ChartType = 'doughnut';

    constructor() { }

    ngOnInit() {    }
}
