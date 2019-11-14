import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss']
})

export class DoughnutChartComponent implements OnInit {

    @Input() data: any[];

    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        },
        // We use these empty structures as placeholders for dynamic theming.
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    // const label = ctx.chart.data.labels[ctx.dataIndex];
                    const label = ctx.dataset.label;
                    return label;
                },
            },

        },
        scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
    };
    public barChartPlugins = [pluginDataLabels];
    public barChartLegend = true;
    public barChartLabels: Label[] = ['Tuesday', 'Thurday', 'Monday'];
    public barChartData: ChartDataSets[] = [
            {data: [50, 100, 50], label: 'Absent'},
            {data: [76, 200, 23], label: 'Attended'},
    ];
    public barChartType: ChartType = 'bar';

    constructor() {
        // console.log(this.barChartOptions);
    }

    ngOnInit() {  }
      // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }
}
