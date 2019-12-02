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
    attendanceList: any[];
    displayingDetail = false;

    hasdata = false;

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
    public barChartLabels: Label[] = [];
    public barChartData: ChartDataSets[] = [
            {data: [0, 1, 2, 3], label: 'Absent'},
            {data: [4, 5, 6, 7], label: 'Attended'},
    ];
    public barChartType: ChartType = 'horizontalBar';

    constructor(private http: HttpClient) {  }

    ngOnInit() {  }
    ngOnChanges() {
        this.displayingDetail = false;
        this.hasdata = false;
        this.loadAttendance();
     }

    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        try {
            this.displayingDetail = !this.displayingDetail;
            let ac: any = {};
            ac = active[0];
            this.loadAttendanceDetail(ac._model.label);
        } catch { }
    }
    loadAttendanceDetail(thisday) {

        if (this.displayingDetail) {

            this.barChartLabels = [];
            this.barChartData = [];

            let res;
            if (thisday === 'Optional') {
                res = this.attendanceList.filter( r => r.eventdate.indexOf('Mon') === -1
                                                    && r.eventdate.indexOf('Tue') === -1
                                                    && r.eventdate.indexOf('Thu') === -1
                                        );
            } else {
                res = this.attendanceList.filter( r => r.eventdate.indexOf(thisday.substring(0, 3)) !== -1 );
            }

            if (res.length === 0)
            {
                this.loadAttendance();
            } else {
                const attended: number[] = [];
                const absent: number[] = [];
                let newlabel: string;
                let att: number;
                let abs: number;
                res.forEach((value) => {

                    if (newlabel !== value.eventdate.substring(0, 15)) {
                        if (att > 0 || abs > 0 ) {
                            attended.push(att);
                            absent.push(abs);
                        }
                        newlabel = value.eventdate.substring(0, 15);
                        this.barChartLabels.push(newlabel);
                        att = 0;
                        abs = 0;
                    }
                    if (value.attended === true) {
                        att += 1;
                    } else {
                        abs += 1;
                    }
                });

                if (att > 0 || abs > 0 ) {
                    attended.push(att);
                    absent.push(abs);
                }

                this.barChartData = [
                    {data: absent, label: 'Absent'},
                    {data: attended, label: 'Attended'}, ];
            }

        } else { this.loadAttendance(); }

    }

    loadAttendance() {
        this.barChartLabels = ['Tuesday', 'Thurday', 'Monday', 'Optional'];
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetAllAttendance').subscribe(result => {

            let res: any[];
            if (this.Filter === 'ALL') {
             res = result;
            } else { res = result.filter(r => r.raidername === this.Filter); }

            if (res.length > 0) { this.hasdata = true; }
            this.attendanceList = res;
            const mon = res.filter( r => r.eventdate.indexOf('Mon') !== -1);
            const tue = res.filter( r => r.eventdate.indexOf('Tue') !== -1);
            const thu = res.filter( r => r.eventdate.indexOf('Thu') !== -1);
            const opt = res.filter( r => r.eventdate.indexOf('Mon') === -1
                                      && r.eventdate.indexOf('Tue') === -1
                                      && r.eventdate.indexOf('Thu') === -1
                            );
            let imon = 0;
            let imon2 = 0;
            let itue = 0;
            let itue2 = 0;
            let ithu = 0;
            let ithu2 = 0;
            let iopt = 0;
            let iopt2 = 0;

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
            opt.forEach((value) => {
                if (value.attended === true) {
                    iopt += 1;
                } else { iopt2 += 1; }
            });

            this.barChartData = [
                {data: [itue2, ithu2, imon2, iopt2], label: 'Absent'},
                {data: [itue, ithu, imon, iopt], label: 'Attended'}, ];

         });
    }

}
