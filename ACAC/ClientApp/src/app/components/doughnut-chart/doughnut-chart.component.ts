import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss']
})

export class DoughnutChartComponent implements OnInit, OnChanges {

    @Input() Filter: string;

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
                    return ''; // label;
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
    public barChartType: ChartType = 'horizontalBar';

    constructor(private http: HttpClient) {  }

    ngOnInit() {  }
    ngOnChanges() { this.loadAttendance(); }

    loadAttendance() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetAllAttendance').subscribe(result => {
            let res: any[];
            if (this.Filter === 'ALL') {
             res = result;
            } else { res = result.filter(r => r.raidername === this.Filter); }

            // console.log(result);
            // console.log(res);
            const mon = res.filter( r => r.eventdate.indexOf('Mon') >= 0);
            const tue = res.filter( r => r.eventdate.indexOf('Tue') >= 0);
            const thu = res.filter( r => r.eventdate.indexOf('Thu') >= 0);
            let imon = 0;
            let imon2 = 0;
            let itue = 0;
            let itue2 = 0;
            let ithu = 0;
            let ithu2 = 0;

            mon.forEach((value) => {
                if (value.attended === true) {
                    imon += 1;
                } else { imon2 += 1; }
            });
            tue.forEach((value) => {
                if (value.attended === true) {
                    itue += 1;
                } else { itue2 += 1; }
            });
            thu.forEach((value) => {
                if (value.attended === true) {
                    ithu += 1;
                } else { ithu2 += 1; }
            });

            this.barChartData = [
                {data: [itue2, ithu2, imon2], label: 'Absent'},
                {data: [itue, ithu, imon], label: 'Attended'}, ];

         });
    }

}
